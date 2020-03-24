import { Component, OnInit } from '@angular/core';
import { TopoService } from './topo.service';
import { HttpResponse } from '@angular/common/http';
import { ITopo, Topo } from '../../shared/model/topo.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private topoService: TopoService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.topos = [];
  }

  loadAll() {
    this.topoService.getAllTopos().subscribe((res: EntityArrayResponseType ) => this.topos = res.body);
  }

  ngOnInit() {
    this.loadAll();
    this.initForm();
  }

  initForm() {
    this.topoForm = this.formBuilder.group({
      name: '',
      country: '',
      region: '',
      cotation: '',
      description: ''
    });
  }

  onCreate() {
    const formValue = this.topoForm.value;
    const topo = new Topo();
    topo.name = formValue.name;
    topo.country = formValue.country;
    topo.region = formValue.region;
    topo.cotation = formValue.cotation;
    topo.description = formValue.description;
    let topoCreated: ITopo;
    this.topoService.createTopo(topo).subscribe((res: EntityResponseType) => topoCreated = res.body);
    this.router.navigate([`/topos/${topoCreated.id}`]);
  }

  onDetail(topoId) {
    this.router.navigate([`/topos/${topoId}`]);
  }

}
