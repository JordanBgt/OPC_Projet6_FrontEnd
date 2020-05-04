import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IVoie, Voie } from '../shared/model/voie.model';
import { VoieService } from '../services/voie.service';
import { IVoieLight } from '../shared/model/voie-light.model';
import { ICotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CotationService } from '../services/cotation.service';
import { Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { TokenStorageService } from '../security/token-storage.service';

type EntityResponseType = HttpResponse<IVoie>;
type EntityArrayResponseType = HttpResponse<IVoieLight[]>;

@Component({
  selector: 'app-voie',
  templateUrl: './voie.component.html',
  styleUrls: ['./voie.component.scss']
})
export class VoieComponent implements OnInit {

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

  constructor(private voieService: VoieService,
              private formBuilder: FormBuilder,
              private cotationService: CotationService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.voies = [];
    this.cotations = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
  }

  loadAll() {
    this.voieService.getAllVoies({page: this.page, size: this.size, name: this.name, cotationMin: this.cotationMin,
      cotationMax: this.cotationMax}).subscribe((res: EntityArrayResponseType) => this.paginateVoies(res.body));
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body,
      (error: Error) => error.message);
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user = this.tokenStorageService.getUser();
    this.loadAll();
    this.loadCotations();
    this.initSearchForm();
    this.initCreateVoieForm();
  }

  paginateVoies(data: any) {
    this.totalPages = data.content.totalPages;
    for (let i = 0; i < data.content.length; i++) {
      this.voies.push(data.content[i]);
    }
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      name: '',
      cotationMin: '',
      cotationMax: ''
    });
  }

  initCreateVoieForm() {
    this.createVoieForm = this.formBuilder.group({
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
    this.clearVoiesAndPage();
    this.loadAll();
  }

  onCreate() {
    const formValue = this.createVoieForm.value;
    const voie = new Voie();
    voie.userId = this.user.id;
    voie.name = formValue.name;
    voie.description = formValue.description;
    voie.cotationMin = formValue.cotationMin;
    voie.cotationMax = formValue.cotationMax;
    let voieCreated: IVoie;
    this.voieService.createVoie(voie).subscribe((res: EntityResponseType) => voieCreated = res.body,
      (error => console.error(error)),
      () => this.router.navigate([`/voies/${voieCreated.id}`]));
  }

  clearVoiesAndPage() {
    this.voies = [];
    this.page = 0;
  }
}
