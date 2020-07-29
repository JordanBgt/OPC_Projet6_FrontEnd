import { Component, OnDestroy, OnInit } from '@angular/core';
import { Spot } from '../shared/model/spot.model';
import { ICotation } from '../shared/model/cotation.model';
import { SecteurLight } from '../shared/model/secteur-light.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CotationService } from '../services/cotation.service';
import { SecteurService } from '../services/secteur.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';
import { SpotService } from '../services/spot.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Secteur } from '../shared/model/secteur.model';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

/**
 * Component to manage Spot detail. It displays a page with all the information of the requested spot
 */

@Component({
  selector: 'app-spot-detail',
  templateUrl: './spot-detail.component.html',
  styleUrls: ['./spot-detail.component.scss']
})
export class SpotDetailComponent implements OnInit, OnDestroy {

  spot: Spot;
  spotId: number;
  cotations: ICotation[];
  secteurs: SecteurLight[];
  update = false;
  user: any;
  isAdmin: boolean;
  secteurForm: FormGroup;
  isAuthorized = false;
  uploadPhotoForm: FormGroup;
  subscriptions: Subscription[];

  constructor(private spotService: SpotService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private secteurService: SecteurService,
              private carouselConfig: NgbCarouselConfig,
              private tokenStorageService: TokenStorageService,
              private snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.carouselConfig.interval = 0;
    this.cotations = [];
    this.secteurs = [];
    this.subscriptions = [];
  }

  /**
   * Return true if the user had ROLE_ADMIN or if he is the spot creator
   */
  checkIfAuthorized() {
    this.isAuthorized = this.isAdmin || this.user.id === this.spot.userId;
  }

  /**
   * When the component is initialized, we check if the user has ROLE_ADMIN, pickup the spot id from the url params
   * and load the needed entities
   */
  ngOnInit() {
    this.spotId = +this.route.snapshot.paramMap.get('id');
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.loadSpot();
    this.loadCotations();
    this.loadSecteurs();
    this.initSecteurForm();
    this.initUploadPhotoForm();
  }

  onUpdate() {
    this.update = true;
  }

  /**
   * Initializes the upload photo form
   */
  initUploadPhotoForm() {
    this.uploadPhotoForm = this.formBuilder.group({
      photo: ''
    });
  }

  /**
   * It proceeds to the photo upload
   */
  onUploadPhoto() {
    const file: File = this.uploadPhotoForm.value.photo.files[0];
    const extension = file.type.slice(file.type.indexOf('/') + 1);
    const photoIndex = this.spot.photos != null ? this.spot.photos.length : 0;
    const fileName = `spot${this.spot.id}${photoIndex + 1}.${extension}`;
    this.subscriptions.push(this.spotService.uploadPhoto(file, fileName, this.spotId, this.spot.userId, this.user.id).pipe(
      tap((res: Spot) => {
        this.spot = new Spot(res);
        this.snackBar.open('Photo ajoutée !', 'Ok', {duration: 5000});
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to delete a spot. It will redirect the user to spot listing page
   */
  onDelete() {
    this.subscriptions.push(this.spotService.deleteSpot(this.spotId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Spot supprimé !', 'OK', {duration: 5000});
          this.router.navigate(['spots']);
        } else {
          this.snackBar.open('Erreur lors de la suppression du spot !', 'OK', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get the requested spot
   */
  loadSpot() {
    this.subscriptions.push(this.spotService.getOneSpot(this.spotId).pipe(
      tap((res: any) => {
        this.spot = new Spot(res);
        this.checkIfAuthorized();
      }),
    ).subscribe());
  }

  /**
   * Method to get all cotations. We need them in the spot update form
   */
  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all secteurs that belong to the spot
   */
  loadSecteurs() {
    this.subscriptions.push(this.secteurService.getAllSecteurs({unpaged: true, spotId: this.spotId}).pipe(
      tap((res: any) => this.secteurs = res.content),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Initializes the secteur creation form
   */
  initSecteurForm() {
    this.secteurForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * Method to update the spot
   * @param spot the spot to update
   */
  updateSpot(spot: Spot) {
    this.subscriptions.push(this.spotService.updateSpot(spot, this.user.id).pipe(
      tap((res: Spot) => {
        this.spot = new Spot(res);
        this.update = false;
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Creates a secteur
   */
  onAddSecteur() {
    const formValue = this.secteurForm.value;
    const secteur = new Secteur(null, formValue.name, formValue.description, this.user.id, this.spotId);
    this.subscriptions.push(this.secteurService.createSecteur(secteur).pipe(
      tap(() => this.loadSecteurs()),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Deletes a secteur
   * @param secteurId id of the secteur to delete
   */
  onDeleteSecteur(secteurId: number) {
    this.subscriptions.push(this.secteurService.deleteSecteur(secteurId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Secteur supprimé', 'Ok', {duration: 5000});
          this.loadSecteurs();
        } else {
          this.snackBar.open('Erreur lors de la suppression du secteur', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * It updates the spot according to the spot official value
   * @param value value of the toggle input
   */
  onOfficialToggleChange(value: MatSlideToggleChange) {
    this.spot.official = value.checked;
    this.updateSpot(this.spot);
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
