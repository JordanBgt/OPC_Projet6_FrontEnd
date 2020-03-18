import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ILongueur } from '../../shared/model/longueur.model';
import { LongueurService } from './longueur.service';

type EntityResponseType = HttpResponse<ILongueur>;
type EntityArrayResponseType = HttpResponse<ILongueur[]>;

@Component({
  selector: 'app-longueur',
  templateUrl: './longueur.component.html',
  styleUrls: ['./longueur.component.scss']
})
export class LongueurComponent implements OnInit {

  longueurs: ILongueur[];

  constructor(private longueurService: LongueurService) {
    this.longueurs = [];
  }

  loadAll() {
    this.longueurService.getAllLongueurs().subscribe((res: EntityArrayResponseType) => this.longueurs = res.body);
  }

  ngOnInit() {
    this.loadAll();
  }

}
