import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopoService } from '../services/topo.service';
import { Topo } from '../shared/model/topo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICotation } from '../shared/model/cotation.model';
import { CotationService } from '../services/cotation.service';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { TopoLight } from '../shared/model/topo-light.model';
import { TokenStorageService } from '../security/token-storage.service';
import { SpotService } from '../services/spot.service';
import { catchError, tap } from 'rxjs/operators';
import { SpotLight } from '../shared/model/spot-light.model';
import { Subscription, throwError } from 'rxjs';

/**
 * Component to manage Topo. It displays a list of TopoLight
 */

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit, OnDestroy {

  topos: TopoLight[];
  topoForm: FormGroup;
  cotations: ICotation[];
  spots: SpotLight[];
  size: number;
  page: number;
  searchForm: FormGroup;
  country: string;
  name: string;
  cotationMin: number;
  cotationMax: number;
  totalPages: number;
  isLoggedIn: boolean;
  user: any;
  subscriptions: Subscription[];

  constructor(private topoService: TopoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cotationService: CotationService,
              private tokenStorageService: TokenStorageService,
              private spotService: SpotService) {
    this.topos = [];
    this.cotations = [];
    this.spots = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
    this.subscriptions = [];
  }

  /**
   * Method to load all topos
   */
  loadAll() {
    this.subscriptions.push(this.topoService.getAllTopos({page: this.page, size: this.size, country: this.country, name: this.name,
      cotationMin: this.cotationMin, cotationMax: this.cotationMax}).pipe(
        tap(data => {
          this.totalPages = data.totalPages;
          for (const topo of data.content) {
            this.topos.push(new TopoLight(topo));
          }
        })
    )
      .subscribe());
  }

  /**
   * Method to get all cotations. We need them in the topo creation form
   */
  loadCotations() {
    this.subscriptions.push(this.cotationService.getAllCotations().pipe(
      tap((res: ICotation[]) => this.cotations = res),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to load all spots. We need them in the topo creation form
   */
  loadSpots() {
    this.subscriptions.push(this.spotService.getAllSpots({unpaged: true}).pipe(
      tap((res: any) => this.spots = res.content),
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
    this.loadSpots();
    this.initTopoForm();
    this.initSearchForm();
  }

  /**
   * Initializes the topo creation form
   */
  initTopoForm() {
    this.topoForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      cotationMin: ['', Validators.required],
      cotationMax: ['', Validators.required],
      description: ['', Validators.required],
      spots: ['']
    });
  }

  /**
   * Initializes the search form
   */
  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      country: '',
      name: '',
      cotationMin: '',
      cotationMax: ''
    });
  }

  /**
   * Method to create a topo. When the topo is created, the user is redirect to the topo created detail page
   */
  onCreate() {
    const formValue = this.topoForm.value;
    const spots = formValue.spots !== '' ? formValue.spots : null;
    const topo = new Topo({id: null, name: formValue.name, description: formValue.description,
      cotationMin: formValue.cotationMin, cotationMax: formValue.cotationMax, publicationDate: new Date(), photo: null,
      creatorId: this.user.id, spots, country: formValue.country, region: formValue.region});
    let topoCreated: Topo;
    this.subscriptions.push(this.topoService.createTopo(topo).pipe(
      tap((res: Topo) => {
        topoCreated = new Topo(res);
        this.router.navigate([`/topos/${topoCreated.id}`]);
      }),
      catchError(error => throwError(error))
    ).subscribe());
  }

  /**
   * Method to load a new page of topos
   * @param page index of the page claimed
   */
  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  /**
   * Request a page of topos with search criteria
   */
  onSearch() {
    const formValue = this.searchForm.value;
    this.country = formValue.country !== '' ? formValue.country : null;
    this.name = formValue.name !== '' ? formValue.name : null;
    this.cotationMin = formValue.cotationMin !== null ? formValue.cotationMin.id : null;
    this.cotationMax = formValue.cotationMax !== null ? formValue.cotationMax.id : null;
    this.clearToposAndPage();
    this.loadAll();
  }

  /**
   * Clears the topos arrays and the index of the page
   */
  clearToposAndPage() {
    this.topos = [];
    this.page = 0;
  }

  /**
   * When the component is destroyed, we must unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
