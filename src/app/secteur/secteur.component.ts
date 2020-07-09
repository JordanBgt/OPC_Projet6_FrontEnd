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

  loadAll() {
    this.subscriptions.push(this.secteurService.getAllSecteurs({page: this.page, size: this.size, name: this.name}).pipe(
      tap((res: any) => this.paginateSecteurs(res)),
      catchError(error => throwError(error))
    ).subscribe());
  }

  loadSpots() {
    this.subscriptions.push(this.spotService.getAllSpots({unpaged: true}).pipe(
      tap((res: any) => {
        res.content.forEach(spot => this.spots.push(new SpotLight(spot)));
      })
    ).subscribe());
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user = this.tokenStorageService.getUser();
    this.loadAll();
    this.loadSpots();
    this.initSearchForm();
    this.initCreateSecteurForm();
  }

  paginateSecteurs(data: any) {
    this.totalPages = data.totalPages;
    for (const secteur of data.content) {
      this.secteurs.push(secteur);
    }
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      name: ''
    });
  }

  initCreateSecteurForm() {
    this.createSecteurForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      spots: ['']
    });
  }

  onSearch() {
    this.name = this.searchForm.value.name !== '' ? this.searchForm.value.name : null;
    this.clearSecteursAndPage();
    this.loadAll();
  }

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

  clearSecteursAndPage() {
    this.secteurs = [];
    this.page = 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
