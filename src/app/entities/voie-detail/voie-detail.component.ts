import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IVoie, Voie } from '../../shared/model/voie.model';
import { ICotation } from '../../shared/model/cotation.model';
import { LongueurLight } from '../../shared/model/longueur-light.model';
import { VoieService } from '../voie/voie.service';
import { CotationService } from '../cotation/cotation.service';
import { LongueurService } from '../longueur/longueur.service';
import { ActivatedRoute } from '@angular/router';
import { VoieDetailService } from './voie-detail.service';

type EntityResponseType = HttpResponse<IVoie>;

@Component({
  selector: 'app-voie-detail',
  templateUrl: './voie-detail.component.html',
  styleUrls: ['./voie-detail.component.scss']
})
export class VoieDetailComponent implements OnInit {

  voie: IVoie;
  voieId: number;
  cotations: ICotation[];
  longueurs: LongueurLight[];
  update = false;

  constructor(private voieDetailService: VoieDetailService,
              private cotationService: CotationService,
              private longueurService: LongueurService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.voieId = +this.route.snapshot.paramMap.get('id');
    this.loadVoie();
    this.loadCotations();
    this.loadLongueurs();
  }

  onUpdate() {
    this.update = true;
  }

  loadVoie() {
    this.voieDetailService.getOneVoie(this.voieId).subscribe((res: EntityResponseType) => this.voie = res.body);
  }

  loadCotations() {
    this.cotationService.getAllCotations().subscribe((res: HttpResponse<ICotation[]>) => this.cotations = res.body);
  }

  loadLongueurs() {
    this.longueurService.getAllLongueurs({unpaged: true})
      .subscribe((res: HttpResponse<any>) => this.longueurs = res.body.content);
  }

  updateVoie(voie: Voie) {
    this.voieDetailService.updateVoie(voie).subscribe((res: EntityResponseType) => this.voie = res.body,
      (error => console.error(error)),
      () => this.update = false);
  }
}
