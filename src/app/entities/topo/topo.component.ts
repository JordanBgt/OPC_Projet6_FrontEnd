import { Component, OnInit } from '@angular/core';
import { TopoService } from './topo.service';
import { HttpResponse } from '@angular/common/http';
import { ITopo } from '../../shared/model/topo.model';

type EntityResponseType = HttpResponse<ITopo>;
type EntityArrayResponseType = HttpResponse<ITopo[]>;

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  topos: ITopo[];

  constructor(private topoService: TopoService) {
    this.topos = [];
  }

  loadAll() {
    this.topoService.getAllTopos().subscribe((res: EntityArrayResponseType ) => this.topos = res.body);
  }

  ngOnInit() {
    this.loadAll();
  }

}
