import { Component, OnInit } from '@angular/core';
import { TopoService } from './topo.service';
import { HttpResponse } from '@angular/common/http';
import { ITopo } from '../../shared/model/topo.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICotation } from '../../shared/model/cotation.model';
import { CotationService } from '../cotation/cotation.service';
import { TopoSave } from '../../shared/model/topo-save.model';
import { ITEMS_PER_PAGE } from '../../../../app.constants';
import { ITopoLight } from '../../shared/model/topo-light.model';

type EntityResponseType = HttpResponse<ITopo>;
type EntityArrayResponseType = HttpResponse<ITopoLight[]>;

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  topos: ITopoLight[];
  topoForm: FormGroup;
  cotations: ICotation[];
  size: number;
  page: number;
  searchForm: FormGroup;
  country: string;
  name: string;
  cotationMin: number;
  cotationMax: number;
  isAvailable: boolean;
  totalPages: number;

  constructor(private topoService: TopoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cotationService: CotationService) {
    this.topos = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
  }

  loadAll() {
    this.topoService.getAllTopos({page: this.page, size: this.size, country: this.country, name: this.name,
      cotationMin: this.cotationMin, cotationMax: this.cotationMax, isAvailable: this.isAvailable})
      .subscribe((res: EntityArrayResponseType ) => this.paginateTopos(res.body));
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body,
      (error: Error) => error.message);
  }

  ngOnInit() {
    this.loadAll();
    this.loadCotations();
    this.initTopoForm();
    this.initSearchForm();
  }

  initTopoForm() {
    this.topoForm = this.formBuilder.group({
      name: '',
      country: '',
      region: '',
      cotationMin: '',
      cotationMax: '',
      description: ''
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
    const topo = new TopoSave();
    topo.name = formValue.name;
    topo.country = formValue.country;
    topo.region = formValue.region;
    topo.cotationMin = formValue.cotationMin;
    topo.cotationMax = formValue.cotationMax;
    topo.description = formValue.description;
    let topoCreated: ITopo;
    this.topoService.createTopo(topo).subscribe((res: EntityResponseType) => topoCreated = res.body,
      (error: Error) => console.error(error.message),
      () => this.router.navigate([`/topos/${topoCreated.id}`]) );
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

   paginateTopos(data: any) {
    this.totalPages = data.totalPages;
    for (let i = 0; i < data.content.length; i++) {
      this.topos.push(data.content[i]);
    }
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
