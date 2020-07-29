import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISecteur, Secteur } from '../shared/model/secteur.model';
import { VoieLight } from '../shared/model/voie-light.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VoieService } from '../services/voie.service';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecteurService } from '../services/secteur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Voie } from '../shared/model/voie.model';
import { ICotation } from '../shared/model/cotation.model';
import { CotationService } from '../services/cotation.service';
import { SpotService } from '../services/spot.service';
import { SpotLight } from '../shared/model/spot-light.model';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

/**
 * Component to manage Secteur detail. It displays a page with all the information of the requested secteur
 */

@Component({
  selector: 'app-secteur-detail',
  templateUrl: './secteur-detail.component.html',
  styleUrls: ['./secteur-detail.component.scss']
})
export class SecteurDetailComponent implements OnInit, OnDestroy {

  secteur: ISecteur;
  secteurId: number;
  voies: VoieLight[];
  update = false;
  user: any;
  isAdmin: boolean;
  voieForm: FormGroup;
  cotations: ICotation[];
  isAuthorized = false;
  spots: SpotLight[];
  subscriptions: Subscription[];

  constructor(private secteurService: SecteurService,
              private route: ActivatedRoute,
              private voieService: VoieService,
              private tokenStorageService: TokenStorageService,
              private snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder,
              private cotationService: CotationService,
              private spotService: SpotService) {
    this.voies = [];
    this.cotations = [];
    this.spots = [];
    this.subscriptions = [];
  }

  /**
   * When the component is initialized, we check if the user has ROLE_ADMIN, pickup the secteur id from the url params
   * and load the needed entities
   */
  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.secteurId = +this.route.snapshot.paramMap.get('id');
    this.loadSecteur();
    this.loadVoies();
    this.loadCotations();
    this.loadSpots();
    this.initVoieForm();
  }

  /**
   * Return true if the user had ROLE_ADMIN or if he is the secteur creator
   */
  checkIfAuthorized() {
    this.isAuthorized = this.isAdmin || this.user.id === this.secteur.userId;
  }

  onUpdate() {
    this.update = true;
  }

  /**
   * Method to delete the secteur. It will redirect the user to the secteur listing page
   */
  onDelete() {
    this.subscriptions.push(this.secteurService.deleteSecteur(this.secteurId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Secteur supprimé', 'Ok', {duration: 5000});
          this.router.navigate(['secteurs']);
        } else {
          this.snackBar.open('Erreur lors de la suppression du secteur', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get the requested secteur
   */
  loadSecteur() {
    this.subscriptions.push(this.secteurService.getOneSecteur(this.secteurId).pipe(
      tap((res: ISecteur) => {
        this.secteur = res;
        this.checkIfAuthorized();
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all voies that belong to the secteur
   */
  loadVoies() {
    this.subscriptions.push(this.voieService.getAllVoies({unpaged: true, secteurId: this.secteurId}).pipe(
      tap((res: any) => this.voies = res.content),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all cotations. We need them in the secteur update form and in the voie creation form
   */
  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all spots. We need them in the secteur update form
   */
  loadSpots() {
    this.subscriptions.push(this.spotService.getAllSpots({unpaged: true}).pipe(
      tap((res: any) => this.spots = res.content),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to update the secteur
   * @param secteur to update
   */
  updateSecteur(secteur: Secteur) {
    this.subscriptions.push(this.secteurService.updateSecteur(secteur, this.user.id).pipe(
      tap((res: ISecteur) => {
        this.secteur = res;
        this.update = false;
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Initializes the voie creation form
   */
  initVoieForm() {
    this.voieForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cotationMin: ['', Validators.required],
      cotationMax: ['', Validators.required]
    });
  }

  /**
   * Creates the voie
   */
  onAddVoie() {
    const formValue = this.voieForm.value;
    const voie = new Voie(null, formValue.name, formValue.cotationMin, formValue.cotationMax, formValue.description,
      this.user.id, this.secteurId);
    this.subscriptions.push(this.voieService.createVoie(voie).pipe(
      tap(() => this.loadVoies()),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Delete the voie
   * @param voieId id of the voie to delete
   */
  onDeleteVoie(voieId: number) {
    this.subscriptions.push(this.voieService.deleteVoie(voieId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.loadVoies();
          this.snackBar.open('Voie supprimée', 'Ok', {duration: 5000});
        } else {
          this.snackBar.open('Erreur lors de la suppression de la voie', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
