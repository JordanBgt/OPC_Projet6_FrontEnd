import { Component, OnInit } from '@angular/core';
import { TopoService } from './topo.service';
import { HttpResponse } from '@angular/common/http';
import { ITopo, Topo } from '../../shared/model/topo.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICotation } from '../../shared/model/cotation.model';
import { CotationService } from '../cotation/cotation.service';
import { TopoSave } from '../../shared/model/topoSave.model';

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

  constructor(private topoService: TopoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cotationService: CotationService) {
    this.topos = [];
  }

  loadAll() {
    this.topoService.getAllTopos().subscribe((res: EntityArrayResponseType ) => this.topos = res.body);
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
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

}
