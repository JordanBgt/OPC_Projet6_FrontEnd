import { Component, OnInit } from '@angular/core';
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
import { throwError } from 'rxjs';

@Component({
  selector: 'app-spot-detail',
  templateUrl: './spot-detail.component.html',
  styleUrls: ['./spot-detail.component.scss']
})
export class SpotDetailComponent implements OnInit {

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

  constructor(private spotService: SpotService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private secteurService: SecteurService,
              private carouselConfig: NgbCarouselConfig,
              private tokenStorageService: TokenStorageService,
              private snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.carouselConfig.interval = 3000;
    this.cotations = [];
    this.secteurs = [];
  }

  checkIfAuthorized() {
    this.isAuthorized = this.isAdmin || this.user.id === this.spot.userId;
  }

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

  initUploadPhotoForm() {
    this.uploadPhotoForm = this.formBuilder.group({
      photo: ''
    });
  }

  onUploadPhoto() {
    const file: File = this.uploadPhotoForm.value.photo.files[0];
    const extension = file.type.slice(file.type.indexOf('/') + 1);
    const photoIndex = this.spot.photos != null ? this.spot.photos.length : 0;
    const fileName = `${this.spot.name}-photo-${photoIndex + 1}.${extension}`;
    this.spotService.uploadPhoto(file, fileName, this.spotId, this.spot.userId, this.user.id).pipe(
      tap((res: Spot) => this.spot = res),
      catchError(error => throwError(error))
    ).subscribe();
  }

  onDelete() {
    this.spotService.deleteSpot(this.spotId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Spot supprimé !', 'OK', {duration: 5000});
          this.router.navigate(['spots']);
        } else {
          this.snackBar.open('Erreur lors de la suppression du spot !', 'OK', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadSpot() {
    this.spotService.getOneSpot(this.spotId).pipe(
      tap((res: any) => {
        this.spot = new Spot(res);
        this.checkIfAuthorized();
      }),
    ).subscribe();
  }

  loadCotations() {
    this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadSecteurs() {
    this.secteurService.getAllSecteurs({unpaged: true, spotId: this.spotId}).pipe(
      tap((res: any) => res.content.forEach(secteur => this.secteurs.push(secteur))),
      catchError(error => throwError(error))
    ).subscribe();
  }

  initSecteurForm() {
    this.secteurForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  updateSpot(spot: Spot) {
    this.spotService.updateSpot(spot, this.user.id).pipe(
      tap((res: Spot) => this.spot = res),
      tap(() => this.update = false)
    ).subscribe();
  }

  onAddSecteur() {
    const formValue = this.secteurForm.value;
    const secteur = new Secteur(null, formValue.name, formValue.description, this.user.id, this.spotId);
    this.secteurService.createSecteur(secteur).pipe(
      tap(() => this.loadSecteurs()),
      catchError(error => throwError(error))
    ).subscribe();
  }

  onDeleteSecteur(secteurId: number) {
    this.secteurService.deleteSecteur(secteurId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Secteur supprimé', 'Ok', {duration: 5000});
          this.loadSecteurs();
        } else {
          this.snackBar.open('Erreur lors de la suppression du secteur', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }

  onEditSecteur(secteurId: number) {
    this.router.navigate([`secteurs/${secteurId}`]);
  }

}
