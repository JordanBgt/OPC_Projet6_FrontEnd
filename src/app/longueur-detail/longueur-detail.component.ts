import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILongueur, Longueur } from '../shared/model/longueur.model';
import { ICotation } from '../shared/model/cotation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CotationService } from '../services/cotation.service';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LongueurService } from '../services/longueur.service';
import { IVoieLight } from '../shared/model/voie-light.model';
import { VoieService } from '../services/voie.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

/**
 * Component to manage Longueur detail. It displays a page with all the information of the requested longueur
 */

@Component({
  selector: 'app-longueur-detail',
  templateUrl: './longueur-detail.component.html',
  styleUrls: ['./longueur-detail.component.scss']
})
export class LongueurDetailComponent implements OnInit, OnDestroy {

  longueur: ILongueur;
  longueurId: number;
  cotations: ICotation[];
  update = false;
  user: any;
  isAdmin: boolean;
  voies: IVoieLight[];
  subsriptions: Subscription[];
  isAuthorized = false;

  constructor(private longueurService: LongueurService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar,
              private voieService: VoieService) {
    this.cotations = [];
    this.voies = [];
    this.subsriptions = [];
  }

  /**
   * When the component is initialized, we check if the user has ROLE_ADMIN, pickup the longueur id from the url params
   * and load the needed entities
   */
  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.longueurId = +this.route.snapshot.paramMap.get('id');
    this.loadLongueur();
    this.loadCotations();
    this.loadVoies();
  }

  /**
   * Return true if the user had ROLE_ADMIN or if he is the longueur creator
   */
  checkIfAuthorized() {
    this.isAuthorized = this.isAdmin || this.user.id === this.longueur.id;
  }

  onUpdate() {
    this.update = true;
  }

  /**
   * Method to delete the longueur. It will redirect the user to the longueur listing page
   */
  onDelete() {
    this.subsriptions.push(this.longueurService.deleteLongueur(this.longueurId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Longueur supprimée !', 'Ok', {duration: 5000});
          this.router.navigate(['longueurs']);
        } else {
          this.snackBar.open('Erreur lors de la suppression de la longueur !', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get the requested longueur
   */
  loadLongueur() {
    this.subsriptions.push(this.longueurService.getOneLongueur(this.longueurId).pipe(
      tap((res: ILongueur) => {
        this.longueur = res;
        this.checkIfAuthorized();
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all cotations. We need them in the longueur update form
   */
  loadCotations() {
    this.subsriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all voies. We need them in the longueur update form.
   */
  loadVoies() {
    this.subsriptions.push(this.voieService.getAllVoies({unpaged: true}).pipe(
      tap((res: any) => res.content.forEach(voie => this.voies.push(voie))),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to update the longueur
   * @param longueur longueur to update
   */
  updateLongueur(longueur: Longueur) {
    this.subsriptions.push(this.longueurService.updateLongueur(longueur, this.user.id).pipe(
      tap((res: ILongueur) => {
        this.longueur = res;
        this.update = false;
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subsriptions.forEach(subscription => subscription.unsubscribe());
  }
}
