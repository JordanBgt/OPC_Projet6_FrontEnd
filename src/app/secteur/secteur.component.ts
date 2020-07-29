import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISecteur, Secteur } from '../shared/model/secteur.model';
import { SecteurService } from '../services/secteur.service';
import { ISecteurLight } from '../shared/model/secteur-light.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { TokenStorageService } from '../security/token-storage.service';
import { SpotService } from '../services/spot.service';
import { SpotLight } from '../shared/model/spot-light.model';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

/**
 * Component to manage Secteur. It displays a list of SecteurLight
 */

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.scss']
})
export class SecteurComponent implements OnInit, OnDestroy {

  secteurs: ISecteurLight[];
  spots: SpotLight[];
  size: number;
  page: number;
  totalPages: number;
  searchForm: FormGroup;
  createSecteurForm: FormGroup;
  name: string;
  isLoggedIn: boolean;
  user: any;
  subscriptions: Subscription[];

  constructor(private secteurService: SecteurService,
              private formBuilder: FormBuilder,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private spotService: SpotService) {
    this.secteurs = [];
    this.spots = [];
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.subscriptions = [];
  }

  /**
   * Method that loads all secteurs
   */
  loadAll() {
    this.subscriptions.push(this.secteurService.getAllSecteurs({page: this.page, size: this.size, name: this.name}).pipe(
      tap((res: any) => this.paginateSecteurs(res)),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to get all spots. We need them in the Secteur creation form
   */
  loadSpots() {
    this.subscriptions.push(this.spotService.getAllSpots({unpaged: true}).pipe(
      tap((res: any) => {
        res.content.forEach(spot => this.spots.push(new SpotLight(spot)));
      })
    ).subscribe());
  }

  /**
   * When the component is initialized, we check if the user is logged, we load all needed entities and init forms
   */
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user = this.tokenStorageService.getUser();
    this.loadAll();
    this.loadSpots();
    this.initSearchForm();
    this.initCreateSecteurForm();
  }

  /**
   * Allows to pickup secteurs from the server's response
   * @param data server's response
   */
  paginateSecteurs(data: any) {
    this.totalPages = data.totalPages;
    for (const secteur of data.content) {
      this.secteurs.push(secteur);
    }
  }

  /**
   * Method to load a new page of secteurs
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
      name: ''
    });
  }

  /**
   * Initializes the secteur creation form
   */
  initCreateSecteurForm() {
    this.createSecteurForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      spots: ['']
    });
  }

  /**
   * Request a page of secteurs with search criteria
   */
  onSearch() {
    this.name = this.searchForm.value.name !== '' ? this.searchForm.value.name : null;
    this.clearSecteursAndPage();
    this.loadAll();
  }

  /**
   * Method to create a secteur. When the secteur is created, the user is redirected to the secteur created details
   * page
   */
  onCreate() {
    const formValue = this.createSecteurForm.value;
    const secteur = new Secteur(null, formValue.name, formValue.description, this.user.id, formValue.spots.id);
    let secteurCreated: ISecteur;
    this.subscriptions.push(this.secteurService.createSecteur(secteur).pipe(
      tap((res: ISecteur) => {
        secteurCreated = res;
        this.router.navigate([`/secteurs/${secteurCreated.id}`]);
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Clears the secteurs arrays and the index of the page
   */
  clearSecteursAndPage() {
    this.secteurs = [];
    this.page = 0;
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
