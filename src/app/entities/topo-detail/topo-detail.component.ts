import { Component, OnInit } from '@angular/core';
import { ITopo, Topo } from '../../shared/model/topo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Cotation, ICotation } from '../../shared/model/cotation.model';
import { TopoDetailService } from './topo-detail.service';
import { CotationService } from '../cotation/cotation.service';
import { SpotService } from '../spot/spot.service';
import { SpotLight } from '../../shared/model/spot-light.model';

type EntityResponseType = HttpResponse<ITopo>;

@Component({
  selector: 'app-topo-detail',
  templateUrl: './topo-detail.component.html',
  styleUrls: ['./topo-detail.component.scss']
})
export class TopoDetailComponent implements OnInit {

  topo: ITopo;
  topoId: number;
  cotations: Cotation[];
  spots: SpotLight[];
  update = false;

  constructor(private topoDetailService: TopoDetailService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private spotService: SpotService) { }

  ngOnInit() {
    this.topoId = +this.route.snapshot.paramMap.get('id');
    this.loadTopo();
    this.loadCotations();
    this.loadSpots();
  }

  onUpdate() {
    this.update = true;
  }

  loadTopo() {
    this.topoDetailService.getOneTopo(this.topoId).subscribe((res: EntityResponseType) => this.topo = res.body,
      (error) => console.error(error),
      () => console.log(this.topo));
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }

  loadSpots() {
    this.spotService.getAllSpots({unpaged: true}).subscribe((res: HttpResponse<any>) => this.spots = res.body.content);
  }

  updateTopo(topo: Topo) {
    this.topoDetailService.updateTopo(topo).subscribe((res: EntityResponseType) => this.topo = res.body,
      (error => console.error(error)),
      () => this.update = false);
  }
}
