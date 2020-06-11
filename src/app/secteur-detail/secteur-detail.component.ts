import { Component, OnInit } from '@angular/core';
import { ISecteur, Secteur } from '../shared/model/secteur.model';
import { HttpResponse } from '@angular/common/http';
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
import { throwError } from 'rxjs';

@Component({
  selector: 'app-secteur-detail',
  templateUrl: './secteur-detail.component.html',
  styleUrls: ['./secteur-detail.component.scss']
})
export class SecteurDetailComponent implements OnInit {

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
  }

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

  checkIfAuthorized() {
    this.isAuthorized = this.isAdmin || this.user.id === this.secteur.userId;
  }

  onUpdate() {
    this.update = true;
  }

  onDelete() {
    this.secteurService.deleteSecteur(this.secteurId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Secteur supprimé', 'Ok', {duration: 5000});
          this.router.navigate(['secteurs']);
        } else {
          this.snackBar.open('Erreur lors de la suppression du secteur', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadSecteur() {
    this.secteurService.getOneSecteur(this.secteurId).pipe(
      tap((res: ISecteur) => {
        this.secteur = res;
        this.checkIfAuthorized();
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadVoies() {
    this.voieService.getAllVoies({unpaged: true, secteurId: this.secteurId}).pipe(
      tap((res: any) => res.content.forEach(voie => this.voies.push(voie))),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadCotations() {
    this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe();
  }

  loadSpots() {
    this.spotService.getAllSpots({unpaged: true}).pipe(
      tap((res: any) => this.spots = res.content),
      catchError(error => throwError(error))
    ).subscribe();
  }

  updateSecteur(secteur: Secteur) {
    this.secteurService.updateSecteur(secteur, this.user.id).pipe(
      tap((res: ISecteur) => {
        this.secteur = res;
        this.update = false;
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }

  initVoieForm() {
    this.voieForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cotationMin: ['', Validators.required],
      cotationMax: ['', Validators.required]
    });
  }

  onAddVoie() {
    const formValue = this.voieForm.value;
    const voie = new Voie(null, formValue.name, formValue.cotationMin, formValue.cotationMax, formValue.description,
      this.user.id, this.secteurId);
    this.voieService.createVoie(voie).pipe(
      tap(() => this.loadVoies()),
      catchError(error => throwError(error))
    ).subscribe();
  }

  onDeleteVoie(voieId: number) {
    this.voieService.deleteVoie(voieId).pipe(
      tap((res: any) => {
        if (res.status === HTTP_STATUS_NOCONTENT) {
          this.snackBar.open('Voie supprimée', 'Ok', {duration: 5000});
          this.loadVoies();
        } else {
          this.snackBar.open('Erreur lors de la suppression de la voie', 'Ok', {duration: 5000});
        }
      }),
      catchError(error => throwError(error))
    ).subscribe();
  }

  onEditVoie(voieId: number) {
    this.router.navigate([`voies/${voieId}`]);
  }
}
