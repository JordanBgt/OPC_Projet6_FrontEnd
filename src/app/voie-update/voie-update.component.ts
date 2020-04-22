import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cotation } from '../shared/model/cotation.model';
import { Voie } from '../shared/model/voie.model';
import { Longueur } from '../shared/model/longueur.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { findIndexCotation } from '../shared/entity-utils';
import { LongueurLight } from '../shared/model/longueur-light.model';

@Component({
  selector: 'app-voie-update',
  templateUrl: './voie-update.component.html',
  styleUrls: ['./voie-update.component.scss']
})
export class VoieUpdateComponent implements OnInit {

  @Input() voie: Voie;
  @Input() cotations: Cotation[];
  @Input() longueurs: Longueur[];
  @Output() voieUpdatedEvent = new EventEmitter();
  voieUpdated: Voie;
  indexCotationMin: number;
  indexCotationMax: number;
  voieUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.findIndexCotationOption();
    this.initForm();
  }

  initForm() {
    this.voieUpdateForm = this.formBuilder.group({
      name: this.voie.name,
      description: this.voie.description,
      cotationMin: this.cotations[this.indexCotationMin],
      cotationMax: this.cotations[this.indexCotationMax],
      longueurs: ['']
    });
  }

  findIndexCotationOption() {
    this.indexCotationMin = findIndexCotation(this.cotations, this.voie.cotationMin);
    this.indexCotationMax = findIndexCotation(this.cotations, this.voie.cotationMax);
  }

  onUpdate() {
    const formValue = this.voieUpdateForm.value;
    this.voieUpdated = new Voie(this.voie.id, formValue.name, formValue.cotationMin, formValue.cotationMax,
      formValue.longueurs, formValue.description);
    this.voieUpdatedEvent.emit(this.voieUpdated);
  }

  compareObjects(o1: LongueurLight, o2: LongueurLight): boolean {
    return o1.id === o2.id;
  }
}
