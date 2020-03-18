import { Component, OnInit } from '@angular/core';
import { ISpot } from '../../shared/model/spot.model';
import { SpotService } from './spot.service';
import { HttpResponse } from '@angular/common/http';

type EntityResponseType = HttpResponse<ISpot>;
type EntityArrayResponseType = HttpResponse<ISpot[]>;

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss']
})
export class SpotComponent implements OnInit {

  spots: ISpot[];

  constructor(private spotService: SpotService) {
    this.spots = [];
  }

  loadAll() {
    this.spotService.getAllSpots().subscribe((res: EntityArrayResponseType) => this.spots = res.body);
  }

  ngOnInit() {
    this.loadAll();
  }

}
