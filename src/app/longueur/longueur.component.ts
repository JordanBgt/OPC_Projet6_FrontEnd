import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILongueur, Longueur } from '../shared/model/longueur.model';
import { LongueurService } from '../services/longueur.service';
import { ILongueurLight } from '../shared/model/longueur-light.model';
import { ICotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CotationService } from '../services/cotation.service';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { TokenStorageService } from '../security/token-storage.service';
import { IVoieLight } from '../shared/model/voie-light.model';
import { VoieService } from '../services/voie.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-longueur',
  templateUrl: './longueur.component.html',
  styleUrls: ['./longueur.component.scss']
})
export class LongueurComponent implements OnInit, OnDestroy {

  longueurs: ILongueurLight[];
  cotations: ICotation[];
  voies: IVoieLight[];
  size: number;
  page: number;
  totalPages: number;
  searchForm: FormGroup;
  createLongueurForm: FormGroup;
  name: string;
  cotationMin: number;
  cotationMax: number;
  isLoggedIn: boolean;
  user: any;
  subscriptions: Subscription[];

  constructor(private longueurService: LongueurService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cotationService: CotationService,
              private tokenStorageService: TokenStorageService,
              private voieService: VoieService) {
    this.longueurs = [];
    this.cotations = [];
    this.voies = [];
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.subscriptions = [];
  }

  loadAll() {
    this.subscriptions.push(this.longueurService.getAllLongueurs({size: this.size, page: this.page, name: this.name,
      cotationMin: this.cotationMin, cotationMax: this.cotationMax}).pipe(
        tap((res: any) => this.paginateLongueurs(res)),
        catchError(error => throwError(error))
    ).subscribe());
  }

  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  loadVoies() {
    this.subscriptions.push(this.voieService.getAllVoies({unpaged: true}).pipe(
      tap((res: any) => res.content.forEach(voie => this.voies.push(voie))),
      catchError(error => throwError(error))
    ).subscribe());
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user = this.tokenStorageService.getUser();
    this.loadAll();
    this.loadCotations();
    this.loadVoies();
    this.initSearchForm();
    this.initCreateLongueurForm();
  }

  paginateLongueurs(data: any) {
    this.totalPages = data.totalPages;
    for (const longueur of data.content) {
      this.longueurs.push(longueur);
    }
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      name : '',
      cotationMin: '',
      cotationMax: ''
    });
  }

  initCreateLongueurForm() {
    this.createLongueurForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cotationMin: ['', Validators.required],
      cotationMax: ['', Validators.required],
      voies: ['']
    });
  }

  onSearch() {
    const formValue = this.searchForm.value;
    this.name = formValue.name !== '' ? formValue.name : null;
    this.cotationMin = formValue.cotationMin !== null ? formValue.cotationMin.id : null;
    this.cotationMax = formValue.cotationMax !== null ? formValue.cotationMax.id : null;
    this.clearLongueursAndPage();
    this.loadAll();
  }

  onCreate() {
    const formValue = this.createLongueurForm.value;
    const longueur = new Longueur(null, formValue.name, formValue.cotationMin, formValue.cotationMax,
      formValue.description, this.user.id, formValue.voies.id);
    let longueurCreated: ILongueur;
    this.subscriptions.push(this.longueurService.createLongueur(longueur).pipe(
      tap((res: ILongueur) => {
        longueurCreated = res;
        this.router.navigate([`/longueurs/${longueurCreated.id}`]);
      })
    ).subscribe());
  }

  clearLongueursAndPage() {
    this.longueurs = [];
    this.page = 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
