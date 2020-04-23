import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ILongueur } from '../shared/model/longueur.model';
import { LongueurService } from './longueur.service';
import { ILongueurLight } from '../shared/model/longueur-light.model';
import { ICotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CotationService } from '../cotation/cotation.service';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { LongueurSave } from '../shared/model/longueur-save.model';
import { TokenStorageService } from '../security/token-storage.service';

type EntityResponseType = HttpResponse<ILongueur>;
type EntityArrayResponseType = HttpResponse<ILongueurLight[]>;

@Component({
  selector: 'app-longueur',
  templateUrl: './longueur.component.html',
  styleUrls: ['./longueur.component.scss']
})
export class LongueurComponent implements OnInit {

  longueurs: ILongueurLight[];
  cotations: ICotation[];
  size: number;
  page: number;
  totalPages: number;
  searchForm: FormGroup;
  createLongueurForm: FormGroup;
  name: string;
  cotationMin: number;
  cotationMax: number;
  isLoggedIn: boolean;

  constructor(private longueurService: LongueurService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cotationService: CotationService,
              private tokenStorageService: TokenStorageService) {
    this.longueurs = [];
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
  }

  loadAll() {
    this.longueurService.getAllLongueurs({size: this.size, page: this.page, name: this.name,
      cotationMin: this.cotationMin, cotationMax: this.cotationMax})
      .subscribe((res: EntityArrayResponseType) => this.paginateLongueurs(res.body));
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.loadAll();
    this.loadCotations();
    this.initSearchForm();
    this.initCreateLongueurForm();
  }

  paginateLongueurs(data: any) {
    this.totalPages = data.totalPages;
    for (let i = 0; i < data.content.length; i++) {
      this.longueurs.push(data.content[i]);
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
      name: '',
      description: '',
      cotationMin: '',
      cotationMax: ''
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
    const longueur = new LongueurSave();
    longueur.name = formValue.name;
    longueur.description = formValue.description;
    longueur.cotationMin = formValue.cotationMin;
    longueur.cotationMax = formValue.cotationMax;
    let longueurCreated: ILongueur;
    this.longueurService.createLongueur(longueur).subscribe((res: EntityResponseType) => longueurCreated = res.body,
      (error => console.log(error)),
      () => this.router.navigate([`/longueurs/${longueurCreated.id}`]));
  }

  clearLongueursAndPage() {
    this.longueurs = [];
    this.page = 0;
  }
}
