import { Component, OnDestroy, OnInit } from '@angular/core';
import { LongueurService } from '../services/longueur.service';
import { ILongueurLight } from '../shared/model/longueur-light.model';
import { ICotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CotationService } from '../services/cotation.service';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { TokenStorageService } from '../security/token-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

/**
 * Component to manage Longueur. It displays a list of LongueurLight
 */

@Component({
  selector: 'app-longueur',
  templateUrl: './longueur.component.html',
  styleUrls: ['./longueur.component.scss']
})
export class LongueurComponent implements OnInit, OnDestroy {

  longueurs: ILongueurLight[];
  cotations: ICotation[];
  size: number;
  page: number;
  totalPages: number;
  searchForm: FormGroup;
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
              private tokenStorageService: TokenStorageService) {
    this.longueurs = [];
    this.cotations = [];
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.subscriptions = [];
  }

  /**
   * Method to get all longueurs
   */
  loadAll() {
    this.subscriptions.push(this.longueurService.getAllLongueurs({size: this.size, page: this.page, name: this.name,
      cotationMin: this.cotationMin, cotationMax: this.cotationMax}).pipe(
        tap((res: any) => this.paginateLongueurs(res)),
        catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all cotations. We need them in the search form.
   */
  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
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
    this.initSearchForm();
  }

  /**
   * Allows to pickup longueurs from the server's response
   * @param data server's response
   */
  paginateLongueurs(data: any) {
    this.totalPages = data.totalPages;
    for (const longueur of data.content) {
      this.longueurs.push(longueur);
    }
  }

  /**
   * Method to load a new page of longueurs
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
      name : '',
      cotationMin: '',
      cotationMax: ''
    });
  }

  /**
   * Request a page of longueurs with search criteria
   */
  onSearch() {
    const formValue = this.searchForm.value;
    this.name = formValue.name !== '' ? formValue.name : null;
    this.cotationMin = formValue.cotationMin !== null ? formValue.cotationMin.id : null;
    this.cotationMax = formValue.cotationMax !== null ? formValue.cotationMax.id : null;
    this.clearLongueursAndPage();
    this.loadAll();
  }

  /**
   * Clears the longueurs arrays and the index of the page
   */
  clearLongueursAndPage() {
    this.longueurs = [];
    this.page = 0;
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
