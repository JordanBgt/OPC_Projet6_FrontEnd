import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IVoie } from '../../shared/model/voie.model';
import { VoieService } from './voie.service';

type EntityResponseType = HttpResponse<IVoie>;
type EntityArrayResponseType = HttpResponse<IVoie[]>;

@Component({
  selector: 'app-voie',
  templateUrl: './voie.component.html',
  styleUrls: ['./voie.component.scss']
})
export class VoieComponent implements OnInit {

  voies: IVoie[];

  constructor(private voieService: VoieService) {
    this.voies = [];
  }

  loadAll() {
    this.voieService.getAllVoies().subscribe((res: EntityArrayResponseType) => this.voies = res.body);
  }

  ngOnInit() {
    this.loadAll();
  }

}
