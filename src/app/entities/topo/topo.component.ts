import { Component, OnInit } from '@angular/core';
import { TopoService } from './topo.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ITopo, Topo } from '../../shared/model/topo.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICotation } from '../../shared/model/cotation.model';
import { CotationService } from '../cotation/cotation.service';
import { TopoSave } from '../../shared/model/topoSave.model';
import { ITEMS_PER_PAGE } from '../../../../app.constants';

type EntityResponseType = HttpResponse<ITopo>;
type EntityArrayResponseType = HttpResponse<ITopo[]>;

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  topos: ITopo[];
  topoForm: FormGroup;
  cotations: ICotation[];
  size: number;
  lastPage: boolean;
  page: any;

  constructor(private topoService: TopoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cotationService: CotationService) {
    this.topos = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
  }

  loadAll() {
    this.topoService.getAllTopos({page: this.page, size: this.size})
      .subscribe((res: EntityArrayResponseType ) => this.paginateTopos(res.body, res.headers));
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body,
      (error: Error) => error.message);
  }

  ngOnInit() {
    this.loadAll();
    this.loadCotations();
    this.initForm();
  }

  initForm() {
    this.topoForm = this.formBuilder.group({
      name: '',
      country: '',
      region: '',
      cotationMin: '',
      cotationMax: '',
      description: ''
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

  onDetail(topoId) {
    this.router.navigate([`/topos/${topoId}`]);
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  protected paginateTopos(data: ITopo[], httpHeaders: HttpHeaders) {
    this.lastPage = httpHeaders.get('lastPage') === 'true';
    for (let i = 0; i < data.length; i++) {
      this.topos.push(data[i]);
    }
  }

}
