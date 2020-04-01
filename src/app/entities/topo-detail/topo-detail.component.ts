import { Component, OnInit } from '@angular/core';
import { ITopo } from '../../shared/model/topo.model';
import { ActivatedRoute, Params } from '@angular/router';
import { TopoService } from '../topo/topo.service';
import { HttpResponse } from '@angular/common/http';
import { Cotation, ICotation } from '../../shared/model/cotation.model';
import { TopoUpdateComponent } from '../topo-update/topo-update.component';
import { TopoDetailService } from './topo-detail.service';
import { CotationService } from '../cotation/cotation.service';

@Component({
  selector: 'app-topo-detail',
  templateUrl: './topo-detail.component.html',
  styleUrls: ['./topo-detail.component.scss']
})
export class TopoDetailComponent implements OnInit {

  topo: ITopo;
  topoId: number;
  cotations: Cotation[];

  constructor(private topoDetailService: TopoDetailService,
              private route: ActivatedRoute,
              private cotationService: CotationService) { }

  ngOnInit() {
    this.topoId = +this.route.snapshot.paramMap.get('id');
    console.log('PARAMS : ' + this.topoId);
    this.loadTopo();
  }

  loadTopo() {
    this.topoDetailService.getOneTopo(this.topoId).subscribe((res: HttpResponse<ITopo>) => this.topo = res.body);
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }
}
