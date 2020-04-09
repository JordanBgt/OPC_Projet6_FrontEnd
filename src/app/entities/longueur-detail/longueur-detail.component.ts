import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ILongueur, Longueur } from '../../shared/model/longueur.model';
import { Cotation, ICotation } from '../../shared/model/cotation.model';
import { LongueurDetailService } from './longueur-detail.service';
import { ActivatedRoute } from '@angular/router';
import { CotationService } from '../cotation/cotation.service';

type EntityResponseType = HttpResponse<ILongueur>;

@Component({
  selector: 'app-longueur-detail',
  templateUrl: './longueur-detail.component.html',
  styleUrls: ['./longueur-detail.component.scss']
})
export class LongueurDetailComponent implements OnInit {

  longueur: ILongueur;
  longueurId: number;
  cotations: Cotation[];
  update = false;

  constructor(private longueurDetailService: LongueurDetailService,
              private route: ActivatedRoute,
              private cotationService: CotationService) { }

  ngOnInit() {
    this.longueurId = +this.route.snapshot.paramMap.get('id');
    this.loadLongueur();
    this.loadCotations();
  }

  onUpdate() {
    this.update = true;
  }

  loadLongueur() {
    this.longueurDetailService.getOneLongueur(this.longueurId)
      .subscribe((res: EntityResponseType) => this.longueur = res.body);
  }

  loadCotations() {
    this.cotationService.getAllCotations()
      .subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }

  updateLongueur(longueur: Longueur) {
    this.longueurDetailService.updateLongueur(longueur)
      .subscribe((res: EntityResponseType) => this.longueur = res.body,
        (error => console.error(error)),
        () => this.update = false);
  }
}
