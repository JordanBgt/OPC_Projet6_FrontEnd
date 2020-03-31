import { Component, Input, OnInit } from '@angular/core';
import { Cotation } from '../../shared/model/cotation.model';
import { Spot } from '../../shared/model/spot.model';
import { Photo } from '../../shared/model/photo.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-topo-update',
  templateUrl: './topo-update.component.html',
  styleUrls: ['./topo-update.component.scss']
})
export class TopoUpdateComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;
  @Input() cotationMin: Cotation;
  @Input() cotationMax: Cotation;
  @Input() isAvailable: boolean;
  @Input() country: string;
  @Input() region: string;
  @Input() spots: Spot[];
  @Input() photo: Photo;

  @Input() cotations: Cotation[];

  updateTopoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  initForm() {
    this.updateTopoForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      cotationMin: this.cotationMin,
      cotationMax: this.cotationMax,
      isAvailable: this.isAvailable,
      country: this.country,
      region: this.region,
      photo: this.photo
    });
  }


}
