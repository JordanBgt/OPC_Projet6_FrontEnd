import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
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
import { ILongueur, Longueur } from '../shared/model/longueur.model';

type EntityResponseType = HttpResponse<IVoie>;

@Component({
  selector: 'app-voie-detail',
  templateUrl: './voie-detail.component.html',
  styleUrls: ['./voie-detail.component.scss']
})
export class VoieDetailComponent implements OnInit {

  voie: IVoie;
  voieId: number;
  cotations: ICotation[];
  longueurs: LongueurLight[];
  update = false;
  user: any;
  isAdmin: boolean;
  longueurForm: FormGroup;
  isAuthorized = false;

  constructor(private voieService: VoieService,
              private cotationService: CotationService,
              private longueurService: LongueurService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.longueurs = [];
    this.cotations = [];
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.voieId = +this.route.snapshot.paramMap.get('id');
    this.loadVoie();
    this.loadCotations();
    this.loadLongueurs();
    this.initLongueurForm();
  }

  checkIfAuthorized() {
    this.isAuthorized = this.isAdmin || this.user.id === this.voie.userId;
  }

  onUpdate() {
    this.update = true;
  }

  onDelete() {
    let status: number;
    this.voieService.deleteVoie(this.voieId).subscribe((res: any) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Voie supprimée', 'Ok', {duration: 5000});
        this.router.navigate(['voies']);
      }
      });
  }

  loadVoie() {
    this.voieService.getOneVoie(this.voieId).subscribe((res: EntityResponseType) => this.voie = res.body,
      (error => console.error(error)),
      () => this.checkIfAuthorized());
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }

  loadLongueurs() {
    this.longueurService.getAllLongueurs({unpaged: true, voieId: this.voieId})
      .subscribe((res: HttpResponse<any>) => this.longueurs = res.body.content);
  }

  updateVoie(voie: Voie) {
    this.voieService.updateVoie(voie, this.user.id).subscribe((res: EntityResponseType) => this.voie = res.body,
      (error => console.error(error)),
      () => this.update = false);
  }

  initLongueurForm() {
    this.longueurForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cotationMin: ['', Validators.required],
      cotationMax: ['', Validators.required]
    });
  }

  onAddLongueur() {
    const formValue = this.longueurForm.value;
    const longueur = new Longueur(null, formValue.name, formValue.cotationMin, formValue.cotationMax,
      formValue.description, this.user.id, this.voieId);
    this.longueurService.createLongueur(longueur).subscribe((res: HttpResponse<ILongueur>) => console.log(res.body),
      (error => console.error(error)),
      () => this.loadLongueurs());
  }

  onEditLongueur(longueurId: number) {
    this.router.navigate([`longueurs/${longueurId}`]);
  }

  onDeleteLongueur(longueurId: number) {
    let status: number;
    this.longueurService.deleteLongueur(longueurId).subscribe((res: HttpResponse<any>) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Longueur supprimée', 'Ok', {duration: 5000});
        this.loadLongueurs();
      }
      });
  }
}
