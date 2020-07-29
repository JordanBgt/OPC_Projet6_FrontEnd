import { Component, OnDestroy, OnInit } from '@angular/core';
import { IVoie, Voie } from '../shared/model/voie.model';
import { VoieService } from '../services/voie.service';
import { IVoieLight } from '../shared/model/voie-light.model';
import { ICotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CotationService } from '../services/cotation.service';
import { Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { TokenStorageService } from '../security/token-storage.service';
import { ISecteurLight } from '../shared/model/secteur-light.model';
import { SecteurService } from '../services/secteur.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

/**
 * Component to manage Voie. It displays a list of VoieLight
 */

@Component({
  selector: 'app-voie',
  templateUrl: './voie.component.html',
  styleUrls: ['./voie.component.scss']
})
export class VoieComponent implements OnInit, OnDestroy {

  voies: IVoieLight[];
  cotations: ICotation[];
  size: number;
  page: number;
  totalPages: number;
  name: string;
  cotationMin: number;
  cotationMax: number;
  searchForm: FormGroup;
  createVoieForm: FormGroup;
  isLoggedIn: boolean;
  user: any;
  secteurs: ISecteurLight[];
  subscriptions: Subscription[];

  constructor(private voieService: VoieService,
              private formBuilder: FormBuilder,
              private cotationService: CotationService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private secteurService: SecteurService) {
    this.voies = [];
    this.cotations = [];
    this.secteurs = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
    this.subscriptions = [];
  }

  /**
   * Method to load all voies
   */
  loadAll() {
    this.subscriptions.push(this.voieService.getAllVoies({page: this.page, size: this.size, name: this.name, cotationMin: this.cotationMin,
      cotationMax: this.cotationMax}).pipe(
        tap((res: any) => this.paginateVoies(res)),
        catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all cotations. We need them in the voie creation form
   */
  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all secteurs. We need them in the voie creation form
   */
  loadSecteurs() {
    this.subscriptions.push(this.secteurService.getAllSecteurs({unpaged: true}).pipe(
      tap((res: any) => res.content.forEach(secteur => this.secteurs.push(secteur))),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * When the component is initialized, we check if the user is logged, we load all needed entities and init forms
   */
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user = this.tokenStorageService.getUser();
    this.loadAll();
    this.loadCotations();
    this.loadSecteurs();
    this.initSearchForm();
    this.initCreateVoieForm();
  }

  /**
   * Allows to pickup voies from the server's response
   * @param data server's response
   */
  paginateVoies(data: any) {
    this.totalPages = data.content.totalPages;
    for (const voie of data.content) {
      this.voies.push(voie);
    }
  }

  /**
   * Method to load a new page of voies
   * @param page index of the page claimed
   */
  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  /**
   * Initializes the search form
   */
  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      name: '',
      cotationMin: '',
      cotationMax: ''
    });
  }

  /**
   * Initializes the voie creation form
   */
  initCreateVoieForm() {
    this.createVoieForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cotationMin: ['', Validators.required],
      cotationMax: ['', Validators.required],
      secteurs: ['']
    });
  }

  /**
   * Requests a page of voies with search criteria
   */
  onSearch() {
    const formValue = this.searchForm.value;
    this.name = formValue.name !== '' ? formValue.name : null;
    this.cotationMin = formValue.cotationMin !== null ? formValue.cotationMin.id : null;
    this.cotationMax = formValue.cotationMax !== null ? formValue.cotationMax.id : null;
    this.clearVoiesAndPage();
    this.loadAll();
  }

  /**
   * Method to create a voie. When the voie is created, the user is redirected to the voie created details page
   */
  onCreate() {
    const formValue = this.createVoieForm.value;
    const voie = new Voie(null, formValue.name, formValue.cotationMin, formValue.cotationMax, formValue.description,
      this.user.id, formValue.secteurs.id);
    let voieCreated: IVoie;
    this.subscriptions.push(this.voieService.createVoie(voie).pipe(
      tap((res: IVoie) => {
        voieCreated = res;
        this.router.navigate([`/voies/${voieCreated.id}`]);
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Clears the voies arrays and the index of the page
   */
  clearVoiesAndPage() {
    this.voies = [];
    this.page = 0;
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
