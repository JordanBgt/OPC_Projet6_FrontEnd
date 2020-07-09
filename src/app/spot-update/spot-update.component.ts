import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Spot } from '../shared/model/spot.model';
import { Cotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { findIndexCotation } from '../shared/entity-utils';
import { SecteurLight } from '../shared/model/secteur-light.model';

@Component({
  selector: 'app-spot-update',
  templateUrl: './spot-update.component.html',
  styleUrls: ['./spot-update.component.scss']
})
export class SpotUpdateComponent implements OnInit {

  @Input() spot: Spot;
  @Input() cotations: Cotation[];
  @Input() secteurs: SecteurLight[];
  @Input() isAdmin: boolean;
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
      name: [this.spot.name, Validators.required],
      description: [this.spot.description, Validators.required],
      cotationMin: [this.cotations[this.indexCotationMin], Validators.required],
      cotationMax: [this.cotations[this.indexCotationMax], Validators.required],
      country: [this.spot.country, Validators.required],
      city: [this.spot.city, Validators.required],
      secteurs: [''],
      isOfficial: this.spot.official
    });
  }

  findIndexCotationOption() {
    this.indexCotationMin = findIndexCotation(this.cotations, this.spot.cotationMin);
    this.indexCotationMax = findIndexCotation(this.cotations, this.spot.cotationMax);
  }

  onUpdate() {
    const formValue = this.spotUpdateForm.value;
    this.spotUpdated = new Spot({id: this.spot.id, country: formValue.country, city: formValue.city,
      description: formValue.description, official: formValue.isOfficial, topoId: this.spot.topoId,
      photos: this.spot.photos, userId: this.spot.userId, name: formValue.name, cotationMin: formValue.cotationMin,
      cotationMax: formValue.cotationMax});
    this.spotUpdatedEvent.emit(this.spotUpdated);
  }
}
