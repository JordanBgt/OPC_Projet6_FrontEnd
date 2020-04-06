import { Component, OnInit } from '@angular/core';
import { ISpot } from '../../shared/model/spot.model';
import { SpotService } from './spot.service';
import { HttpResponse } from '@angular/common/http';
import { ISpotLight } from '../../shared/model/spot-light.model';
import { ITEMS_PER_PAGE } from '../../../../app.constants';

type EntityResponseType = HttpResponse<ISpot>;
type EntityArrayResponseType = HttpResponse<ISpotLight[]>;

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss']
})
export class SpotComponent implements OnInit {

  spots: ISpotLight[];
  size: number;
  page: number;
  totalPages: number;

  constructor(private spotService: SpotService) {
    this.spots = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
  }

  loadAll() {
    this.spotService.getAllSpots({page: this.page, size: this.size})
      .subscribe((res: EntityArrayResponseType) => this.paginateTopos(res.body));
  }

  ngOnInit() {
    this.loadAll();
  }

  paginateTopos(data: any) {
    this.totalPages = data.totalPages;
    for (let i = 0; i < data.content.length; i++) {
      this.spots.push(data.content[i]);
    }
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }
}
