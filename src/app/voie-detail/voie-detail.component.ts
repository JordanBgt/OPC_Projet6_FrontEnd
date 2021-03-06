import { Component, OnDestroy, OnInit } from '@angular/core';
import { IVoie, Voie } from '../shared/model/voie.model';
import { ICotation } from '../shared/model/cotation.model';
import { LongueurLight } from '../shared/model/longueur-light.model';
import { CotationService } from '../services/cotation.service';
import { LongueurService } from '../services/longueur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';
import { VoieService } from '../services/voie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Longueur } from '../shared/model/longueur.model';
import { ISecteurLight } from '../shared/model/secteur-light.model';
import { SecteurService } from '../services/secteur.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

/**
 * Component to manage Voie detail. It displays a page with all the information of the requested voie
 */

@Component({
  selector: 'app-voie-detail',
  templateUrl: './voie-detail.component.html',
  styleUrls: ['./voie-detail.component.scss']
})
export class VoieDetailComponent implements OnInit, OnDestroy {

  voie: IVoie;
  voieId: number;
  cotations: ICotation[];
  longueurs: LongueurLight[];
  update = false;
  user: any;
  isAdmin: boolean;
  longueurForm: FormGroup;
  isAuthorized = false;
  secteurs: ISecteurLight[];
  subscriptions: Subscription[];

  constructor(private voieService: VoieService,
              private cotationService: CotationService,
              private longueurService: LongueurService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private secteurService: SecteurService) {
    this.longueurs = [];
    this.cotations = [];
    this.secteurs = [];
    this.subscriptions = [];
  }

  /**
   * When the component is initialized, we check if the user has ROLE_ADMIN, pickup the voies id from the url params
   * and load the needed entities
   */
  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.voieId = +this.route.snapshot.paramMap.get('id');
    this.loadVoie();
    this.loadCotations();
    this.loadLongueurs();
    this.loadSecteurs();
    this.initLongueurForm();
  }

  /**
   * Return true if the user had ROLE_ADMIN or if he is the voie creator
   */
  checkIfAuthorized() {
    this.isAuthorized = this.isAdmin || this.user.id === this.voie.userId;
  }

  onUpdate() {
    this.update = true;
  }

  /**
   * Method to delete a voie. It will redirect the user to voie listing page
   */
  onDelete() {
    this.subscriptions.push(this.voieService.deleteVoie(this.voieId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Voie supprimée', 'Ok', {duration: 5000});
          this.router.navigate(['voies']);
        } else {
          this.snackBar.open('Erreur lors de la suppression de la voie', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get the requested voie
   */
  loadVoie() {
    this.subscriptions.push(this.voieService.getOneVoie(this.voieId).pipe(
      tap((res: IVoie) => {
      this.voie = res;
      this.checkIfAuthorized();
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all cotations. We need them in the voie update form
   */
  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all longueurs. it's used to add longueurs to the voie
   */
  loadLongueurs() {
    this.subscriptions.push(this.longueurService.getAllLongueurs({unpaged: true, voieId: this.voieId}).pipe(
      tap((res: any) => this.longueurs = res.content),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all secteurs. It's used, in the voie update form, to select the secteur to wich the spot belongs
   */
  loadSecteurs() {
    this.subscriptions.push(this.secteurService.getAllSecteurs({unpaged: true}).pipe(
      tap((res: any) => res.content.forEach(secteur => this.secteurs.push(secteur))),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to update the voie
   * @param voie to update
   */
  updateVoie(voie: Voie) {
    this.subscriptions.push(this.voieService.updateVoie(voie, this.user.id).pipe(
      tap((res: IVoie) => {
        this.voie = res;
        this.update = false;
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Initializes the longueur creation form
   */
  initLongueurForm() {
    this.longueurForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cotationMin: ['', Validators.required],
      cotationMax: ['', Validators.required]
    });
  }

  /**
   * It creates the longueur
   */
  onAddLongueur() {
    const formValue = this.longueurForm.value;
    const longueur = new Longueur(null, formValue.name, formValue.cotationMin, formValue.cotationMax,
      formValue.description, this.user.id, this.voieId);
    this.subscriptions.push(this.longueurService.createLongueur(longueur).pipe(
      tap(() => this.loadLongueurs()),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * It deletes the longueur
   * @param longueurId id of the longueur to delete
   */
  onDeleteLongueur(longueurId: number) {
    this.subscriptions.push(this.longueurService.deleteLongueur(longueurId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Longueur supprimée', 'Ok', {duration: 5000});
          this.loadLongueurs();
        } else {
          this.snackBar.open('Erreur lors de la suppression de la longueur', 'Ok', {duration: 5000});
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
