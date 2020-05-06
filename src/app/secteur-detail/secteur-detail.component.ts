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
import { IVoie, Voie } from '../shared/model/voie.model';
import { ICotation } from '../shared/model/cotation.model';
import { CotationService } from '../services/cotation.service';
import { ISpotLight } from '../shared/model/spot-light.model';
import { SpotService } from '../services/spot.service';

type EntityResponseType = HttpResponse<ISecteur>;

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
  spots: ISpotLight[];

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
    let status: number;
    this.secteurService.deleteSecteur(this.secteurId).subscribe((res: any) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Secteur supprimé', 'Ok', {duration: 5000});
        this.router.navigate(['secteurs']);
      }
      });
  }

  loadSecteur() {
    this.secteurService.getOneSecteur(this.secteurId)
      .subscribe((res: EntityResponseType) => this.secteur = res.body,
        (error => console.error(error)),
        () => this.checkIfAuthorized());
  }

  loadVoies() {
    this.voieService.getAllVoies({unpaged: true, secteurId: this.secteurId})
      .subscribe((res: HttpResponse<any>) => this.voies = res.body.content);
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body,
      (error: Error) => error.message);
  }

  loadSpots() {
    this.spotService.getAllSpots({unpaged: true})
      .subscribe((res: HttpResponse<any>) => this.spots = res.body.content,
        (error => console.error(error)));
  }

  updateSecteur(secteur: Secteur) {
    this.secteurService.updateSecteur(secteur, this.user.id).subscribe((res: EntityResponseType) => this.secteur = res.body,
      (error => console.error(error)),
      () => this.update = false);
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
    this.voieService.createVoie(voie).subscribe((res: HttpResponse<IVoie>) => console.log(res.body),
      (error => console.error(error)),
      () => this.loadVoies());
  }

  onDeleteVoie(voieId: number) {
    let status: number;
    this.voieService.deleteVoie(voieId).subscribe((res: HttpResponse<any>) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Voie supprimée', 'Ok', {duration: 5000});
        this.loadVoies();
      }
      });
  }

  onEditVoie(voieId: number) {
    this.router.navigate([`voies/${voieId}`]);
  }
}
