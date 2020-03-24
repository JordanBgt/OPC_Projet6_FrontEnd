import { Component, OnInit } from '@angular/core';
import { ITopo } from '../../shared/model/topo.model';
import { ActivatedRoute, Params } from '@angular/router';
import { TopoService } from './topo.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-topo-detail',
  templateUrl: './topo-detail.component.html',
  styleUrls: ['./topo-detail.component.scss']
})
export class TopoDetailComponent implements OnInit {

  topo: ITopo;
  topoId: number;

  constructor(private topoService: TopoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.topoId = +this.route.snapshot.paramMap.get('id');
    console.log('PARAMS : ' + this.topoId);
    this.load();
  }

  load() {
    this.topoService.getOneTopo(this.topoId).subscribe((res: HttpResponse<ITopo>) => this.topo = res.body);
  }
}
