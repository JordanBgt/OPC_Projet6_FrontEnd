import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Spot } from '../../shared/model/spot.model';
import { Cotation } from '../../shared/model/cotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { findIndexCotation } from '../../shared/entity-utils';
import { SecteurLight } from '../../shared/model/secteur-light.model';

@Component({
  selector: 'app-spot-update',
  templateUrl: './spot-update.component.html',
  styleUrls: ['./spot-update.component.scss']
})
export class SpotUpdateComponent implements OnInit {

  @Input() spot: Spot;
  @Input() cotations: Cotation[];
  @Input() secteurs: SecteurLight[];
  @Output() spotUpdatedEvent = new EventEmitter<Spot>();
  spotUpdated: Spot;
  indexCotationMin: number;
  indexCotationMax: number;
  spotUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.findIndexCotationOption();
    this.initForm();
  }

  initForm() {
    this.spotUpdateForm = this.formBuilder.group({
      name: this.spot.name,
      description: this.spot.description,
      cotationMin: this.cotations[this.indexCotationMin],
      cotationMax: this.cotations[this.indexCotationMax],
      country: this.spot.country,
      city: this.spot.city,
      secteurs: ['']
    });
  }

  findIndexCotationOption() {
    this.indexCotationMin = findIndexCotation(this.cotations, this.spot.cotationMin);
    this.indexCotationMax = findIndexCotation(this.cotations, this.spot.cotationMax);
  }

  onUpdate() {
    const formValue = this.spotUpdateForm.value;
    this.spotUpdated = new Spot(this.spot.id, formValue.country, formValue.city, formValue.description,
      this.spot.official, this.spot.topoId, this.spot.photos, formValue.secteurs, this.spot.userId,
      formValue.name, formValue.cotationMin, formValue.cotationMax);
    this.spotUpdatedEvent.emit(this.spotUpdated);
  }

  compareObjects(o1: SecteurLight, o2: SecteurLight): boolean {
    return o1.id === o2.id;
  }
}
