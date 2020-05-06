import { Component, OnInit } from '@angular/core';
import { ISpot, Spot } from '../shared/model/spot.model';
import { SpotService } from '../services/spot.service';
import { HttpResponse } from '@angular/common/http';
import { ISpotLight } from '../shared/model/spot-light.model';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CotationService } from '../services/cotation.service';
import { ICotation } from '../shared/model/cotation.model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../security/token-storage.service';

type EntityResponseType = HttpResponse<ISpot>;
type EntityArrayResponseType = HttpResponse<ISpotLight[]>;

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss']
})
export class SpotComponent implements OnInit {

  spots: ISpotLight[];
  cotations: ICotation[];
  size: number;
  page: number;
  totalPages: number;
  searchForm: FormGroup;
  createSpotForm: FormGroup;
  country: string;
  city: string;
  name: string;
  isOfficial: boolean;
  cotationMin: number;
  cotationMax: number;
  isLoggedIn: boolean;
  user: any;

  constructor(private spotService: SpotService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cotationService: CotationService,
              private carouselConfig: NgbCarouselConfig,
              private tokenStorageService: TokenStorageService) {
    this.spots = [];
    this.cotations = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
    this.carouselConfig.interval = 0;
  }

  loadAll() {
    this.spotService.getAllSpots({page: this.page, size: this.size, country: this.country, city: this.city,
      name: this.name, isOfficial: this.isOfficial, cotationMin: this.cotationMin, cotationMax: this.cotationMax})
      .subscribe((res: EntityArrayResponseType) => this.paginateTopos(res.body),
        (error => console.error(error)),
        () => console.log(JSON.stringify(this.spots)));
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
    this.initeCreateSpotForm();
  }

  paginateTopos(data: any) {
    this.totalPages = data.totalPages;
    for (let i = 0; i < data.content.length; i++) {
      this.spots.push(data.content[i]);
    }
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      country: '',
      city: '',
      name: '',
      isOfficial: '',
      cotationMin: '',
      cotationMax: ''
    });
  }

  initeCreateSpotForm() {
    this.createSpotForm = this.formBuilder.group({
      name: '',
      country: '',
      city: '',
      cotationMin: '',
      cotationMax: '',
      description: ''
    });
  }

  onSearch() {
    const formValue = this.searchForm.value;
    this.country = formValue.country !== '' ? formValue.country : null;
    this.city = formValue.city !== '' ? formValue.city : null;
    this.name = formValue.name !== '' ? formValue.name : null;
    this.cotationMin = formValue.cotationMin !== null ? formValue.cotationMin.id : null;
    this.cotationMax = formValue.cotationMax !== null ? formValue.cotationMax.id : null;
    this.isOfficial = formValue.isOfficial === true;
    this.clearSpotsAndPage();
    this.loadAll();
  }

  onCreate() {
    const formValue = this.createSpotForm.value;
    const spot = new Spot(null, formValue.country, formValue.city, formValue.description, false, null,
      null, this.user.id, formValue.name, formValue.cotationMin, formValue.cotationMax);
    let spotCreated: ISpot;
    this.spotService.createSpot(spot).subscribe((res: EntityResponseType) => spotCreated = res.body,
      (error => console.error(error)),
      () => this.router.navigate([`/spots/${spotCreated.id}`]));
  }

  clearSpotsAndPage() {
    this.spots = [];
    this.page = 0;
  }
}
