import { Component, OnInit } from '@angular/core';
import { ISecteur, Secteur } from '../../shared/model/secteur.model';
import { HttpResponse } from '@angular/common/http';
import { VoieLight } from '../../shared/model/voie-light.model';
import { SecteurDetailService } from './secteur-detail.service';
import { ActivatedRoute } from '@angular/router';
import { VoieService } from '../voie/voie.service';

type EntityResponseType = HttpResponse<ISecteur>;

@Component({
  selector: 'app-secteur-detail',
  templateUrl: './secteur-detail.component.html',
  styleUrls: ['./secteur-detail.component.scss']
})
export class SecteurDetailComponent implements OnInit {

  secteur: ISecteur;
  secteurId: number;
  voies: VoieLight[];
  update = false;

  constructor(private secteurDetailService: SecteurDetailService,
              private route: ActivatedRoute,
              private voieService: VoieService) { }

  ngOnInit() {
    this.secteurId = +this.route.snapshot.paramMap.get('id');
    this.loadSecteur();
    this.loadVoies();
  }

  onUpdate() {
    this.update = true;
  }

  loadSecteur() {
    this.secteurDetailService.getOneSecteur(this.secteurId)
      .subscribe((res: EntityResponseType) => this.secteur = res.body);
  }

  loadVoies() {
    this.voieService.getAllVoies({unpaged: true})
      .subscribe((res: HttpResponse<any>) => this.voies = res.body.content);
  }

  updateSecteur(secteur: Secteur) {
    this.secteurDetailService.updateSecteur(secteur).subscribe((res: EntityResponseType) => this.secteur = res.body,
      (error => console.error(error)),
      () => this.update = false);
  }

}
