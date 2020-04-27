import { Component, OnInit } from '@angular/core';
import { ITopo, Topo } from '../shared/model/topo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Cotation, ICotation } from '../shared/model/cotation.model';
import { TopoDetailService } from './topo-detail.service';
import { CotationService } from '../cotation/cotation.service';
import { SpotService } from '../spot/spot.service';
import { SpotLight } from '../shared/model/spot-light.model';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';

type EntityResponseType = HttpResponse<ITopo>;

@Component({
  selector: 'app-topo-detail',
  templateUrl: './topo-detail.component.html',
  styleUrls: ['./topo-detail.component.scss']
})
export class TopoDetailComponent implements OnInit {

  topo: ITopo;
  topoId: number;
  cotations: ICotation[];
  spots: SpotLight[];
  update = false;
  user: any;
  isAdmin: boolean;

  constructor(private topoDetailService: TopoDetailService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private spotService: SpotService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.topoId = +this.route.snapshot.paramMap.get('id');
    this.loadTopo();
    this.loadCotations();
    this.loadSpots();
  }

  onUpdate() {
    this.update = true;
  }

  onDelete() {
    let status: number;
    this.topoDetailService.deleteTopo(this.topoId).subscribe((res: any) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Topo supprimé !', 'Ok', {duration: 5000});
        this.router.navigate(['topos']);
      }
      });
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
