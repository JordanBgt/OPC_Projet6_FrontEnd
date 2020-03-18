import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ISecteur } from '../../shared/model/secteur.model';
import { SecteurService } from './secteur.service';

type EntityResponseType = HttpResponse<ISecteur>;
type EntityArrayResponseType = HttpResponse<ISecteur[]>;

@Component({
  selector: 'app-secteur',
  templateUrl: './secteur.component.html',
  styleUrls: ['./secteur.component.scss']
})
export class SecteurComponent implements OnInit {

  secteurs: ISecteur[];

  constructor(private secteurService: SecteurService) {
    this.secteurs = [];
  }

  loadAll() {
    this.secteurService.getAllSecteurs().subscribe((res: EntityArrayResponseType) => this.secteurs = res.body);
  }

  ngOnInit() {
    this.loadAll();
  }

}
