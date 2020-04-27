import { Component, OnInit } from '@angular/core';
import { ISpot, Spot } from '../shared/model/spot.model';
import { ICotation } from '../shared/model/cotation.model';
import { SecteurLight } from '../shared/model/secteur-light.model';
import { SpotDetailService } from './spot-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CotationService } from '../cotation/cotation.service';
import { SecteurService } from '../secteur/secteur.service';
import { HttpResponse } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../security/token-storage.service';
import { isAdmin } from '../shared/auth-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTP_STATUS_NOCONTENT } from '../../../app.constants';

type EntityResponseType = HttpResponse<ISpot>;

@Component({
  selector: 'app-spot-detail',
  templateUrl: './spot-detail.component.html',
  styleUrls: ['./spot-detail.component.scss']
})
export class SpotDetailComponent implements OnInit {

  spot: ISpot;
  spotId: number;
  cotations: ICotation[];
  secteurs: SecteurLight[];
  update = false;
  user: any;
  isAdmin: boolean;

  constructor(private spotDetailService: SpotDetailService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private secteurService: SecteurService,
              private carouselConfig: NgbCarouselConfig,
              private tokenStorageService: TokenStorageService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.carouselConfig.interval = 3000;
  }

  ngOnInit() {
    this.spotId = +this.route.snapshot.paramMap.get('id');
    this.user = this.tokenStorageService.getUser();
    this.isAdmin = isAdmin(this.user.roles);
    this.loadSpot();
    this.loadCotations();
    this.loadSecteurs();
  }

  onUpdate() {
    this.update = true;
  }

  onDelete() {
    let status: number;
    this.spotDetailService.deleteSpot(this.spotId).subscribe((res: any) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Spot supprimé !', 'OK', {duration: 5000});
        this.router.navigate(['spots']);
      }
      });
  }

  loadSpot() {
    this.spotDetailService.getOneSpot(this.spotId).subscribe((res: EntityResponseType) => this.spot = res.body);
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }

  loadSecteurs() {
    this.secteurService.getAllSecteurs({unpaged: true}).subscribe((res: HttpResponse<any>) => this.secteurs = res.body.content);
  }

  updateSpot(spot: Spot) {
    this.spotDetailService.updateSpot(spot, this.user.id).subscribe((res: EntityResponseType) => this.spot = res.body,
      (error => console.log(JSON.stringify(error))),
      () => this.update = false);
  }

}
