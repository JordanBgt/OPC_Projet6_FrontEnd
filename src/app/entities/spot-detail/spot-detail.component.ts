import { Component, OnInit } from '@angular/core';
import { ISpot, Spot } from '../../shared/model/spot.model';
import { Cotation, ICotation } from '../../shared/model/cotation.model';
import { SecteurLight } from '../../shared/model/secteur-light.model';
import { SpotDetailService } from './spot-detail.service';
import { ActivatedRoute } from '@angular/router';
import { CotationService } from '../cotation/cotation.service';
import { SecteurService } from '../secteur/secteur.service';
import { HttpResponse } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private spotDetailService: SpotDetailService,
              private route: ActivatedRoute,
              private cotationService: CotationService,
              private secteurService: SecteurService,
              private carouselConfig: NgbCarouselConfig) {
    this.carouselConfig.interval = 3000;
  }

  ngOnInit() {
    this.spotId = +this.route.snapshot.paramMap.get('id');
    this.loadSpot();
    this.loadCotations();
    this.loadSecteurs();
  }

  onUpdate() {
    this.update = true;
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
    this.spotDetailService.updateSpot(spot).subscribe((res: EntityResponseType) => this.spot = res.body,
      (error => console.error(error)),
      () => this.update = false);
  }

}
