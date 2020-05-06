import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ISecteur, Secteur } from '../shared/model/secteur.model';
import { SecteurService } from '../services/secteur.service';
import { ISecteurLight } from '../shared/model/secteur-light.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { SecteurSave } from '../shared/model/secteur-save.model';
import { TokenStorageService } from '../security/token-storage.service';
import { ISpotLight } from '../shared/model/spot-light.model';
import { SpotService } from '../services/spot.service';

type EntityResponseType = HttpResponse<ISecteur>;
type EntityArrayResponseType = HttpResponse<ISecteur[]>;

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.scss']
})
export class SecteurComponent implements OnInit {

  secteurs: ISecteurLight[];
  spots: ISpotLight[];
  size: number;
  page: number;
  totalPages: number;
  searchForm: FormGroup;
  createSecteurForm: FormGroup;
  name: string;
  isLoggedIn: boolean;
  user: any;

  constructor(private secteurService: SecteurService,
              private formBuilder: FormBuilder,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private spotService: SpotService) {
    this.secteurs = [];
    this.spots = [];
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
  }

  loadAll() {
    this.secteurService.getAllSecteurs({page: this.page, size: this.size, name: this.name})
      .subscribe((res: EntityArrayResponseType) => this.paginateSecteurs(res.body));
  }

  loadSpots() {
    this.spotService.getAllSpots({unpaged: true})
      .subscribe((res: HttpResponse<any>) => this.spots = res.body.content,
      (error => console.error(error)));
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
    this.secteurService.createSecteur(secteur).subscribe((res: EntityResponseType) => secteurCreated = res.body,
      (error => console.error(error)),
      () => this.router.navigate([`/secteurs/${secteurCreated.id}`]));
  }

  clearSecteursAndPage() {
    this.secteurs = [];
    this.page = 0;
  }

}
