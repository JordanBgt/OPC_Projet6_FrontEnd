import { Component, OnDestroy, OnInit } from '@angular/core';
import { Spot } from '../shared/model/spot.model';
import { SpotService } from '../services/spot.service';
import { HttpResponse } from '@angular/common/http';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CotationService } from '../services/cotation.service';
import { ICotation } from '../shared/model/cotation.model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../security/token-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { SpotLight } from '../shared/model/spot-light.model';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss']
})
export class SpotComponent implements OnInit, OnDestroy {

  spots: SpotLight[];
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
  subscriptions: Subscription[];

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
    this.subscriptions = [];
  }

  loadAll() {
    this.subscriptions.push(this.spotService.getAllSpots({page: this.page, size: this.size, country: this.country, city: this.city,
      name: this.name, isOfficial: this.isOfficial, cotationMin: this.cotationMin, cotationMax: this.cotationMax})
      .pipe(
       tap((res: HttpResponse<any>) => this.paginateTopos(res)),
        catchError(error => throwError(error))
      )
      .subscribe());
  }


  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user = this.tokenStorageService.getUser();
    this.loadAll();
    this.loadCotations();
    this.initSearchForm();
    this.initCreateSpotForm();
  }

  paginateTopos(data: any) {
    this.totalPages = data.totalPages;
    for (const spot of data.content) {
      this.spots.push(new SpotLight(spot));
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

  initCreateSpotForm() {
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
    const spot = new Spot({id: null, country: formValue.country, city: formValue.city,
      description: formValue.description, official: false, topoId: null, photos: null, userId: this.user.id,
      name: formValue.name, cotationMin: formValue.cotationMin, cotationMax: formValue.cotationMax});
    let spotCreated: Spot;
    this.subscriptions.push(this.spotService.createSpot(spot).pipe(
      tap((res: Spot) => spotCreated = res),
      tap(() => this.router.navigate([`/spots/${spotCreated.id}`])),
      catchError(error => throwError(error))
    ).subscribe());
  }

  clearSpotsAndPage() {
    this.spots = [];
    this.page = 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
