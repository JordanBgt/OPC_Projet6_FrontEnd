import { Component, OnInit } from '@angular/core';
import { TopoService } from '../services/topo.service';
import { HttpResponse } from '@angular/common/http';
import { Topo } from '../shared/model/topo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICotation } from '../shared/model/cotation.model';
import { CotationService } from '../services/cotation.service';
import { ITEMS_PER_PAGE } from '../../../app.constants';
import { ITopoLight, TopoLight } from '../shared/model/topo-light.model';
import { TokenStorageService } from '../security/token-storage.service';
import { ISpotLight } from '../shared/model/spot-light.model';
import { SpotService } from '../services/spot.service';
import { tap } from 'rxjs/operators';

type EntityResponseType = HttpResponse<Topo>;

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  topos: ITopoLight[];
  topoForm: FormGroup;
  cotations: ICotation[];
  spots: ISpotLight[];
  size: number;
  page: number;
  searchForm: FormGroup;
  country: string;
  name: string;
  cotationMin: number;
  cotationMax: number;
  isAvailable: boolean;
  totalPages: number;
  isLoggedIn: boolean;
  user: any;

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
  }

  loadAll() {
    this.topoService.getAllTopos({page: this.page, size: this.size, country: this.country, name: this.name,
      cotationMin: this.cotationMin, cotationMax: this.cotationMax, isAvailable: this.isAvailable}).pipe(
        tap(data => {
          this.totalPages = data.totalPages;
          for (const topo of data.content) {
            this.topos.push(new Topo(topo));
          }
        })
    )
      .subscribe();
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body,
      (error => console.error(error)));
  }

  loadSpots() {
    this.spotService.getAllSpots({unpaged: true})
      .subscribe((res: HttpResponse<any>) => this.spots = res.body.content,
        (error => console.error(error)),
        () => console.log(JSON.stringify(this.spots)));
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user = this.tokenStorageService.getUser();
    this.loadAll();
    this.loadCotations();
    this.loadSpots();
    this.initTopoForm();
    this.initSearchForm();
  }

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

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      country: '',
      name: '',
      cotationMin: '',
      cotationMax: '',
      available: ''
    });
  }

  onCreate() {
    const formValue = this.topoForm.value;
    const topo = new Topo({id: null, name: formValue.name, description: formValue.description,
      cotationMin: formValue.cotationMin, cotationMax: formValue.cotationMax, isAvailable: null,
      country: formValue.country, region: formValue.region, spots: formValue.spots, creatorId: this.user.id,
      tenantId: null, publicationDate: new Date(), photo: null});
    let topoCreated: Topo;
    this.topoService.createTopo(topo).subscribe((res: EntityResponseType) => topoCreated = res.body,
      (error: Error) => console.error(error.message),
      () => this.router.navigate([`/topos/${topoCreated.id}`]) );
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  onSearch() {
    const formValue = this.searchForm.value;
    this.country = formValue.country !== '' ? formValue.country : null;
    this.name = formValue.name !== '' ? formValue.name : null;
    this.cotationMin = formValue.cotationMin !== null ? formValue.cotationMin.id : null;
    this.cotationMax = formValue.cotationMax !== null ? formValue.cotationMax.id : null;
    this.isAvailable = formValue.available === true;
    this.clearToposAndPage();
    this.loadAll();
  }

  clearToposAndPage() {
    this.topos = [];
    this.page = 0;
  }
}
