import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Longueur } from '../../shared/model/longueur.model';
import { Cotation } from '../../shared/model/cotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { findIndexCotation } from '../../shared/entity-utils';

@Component({
  selector: 'app-longueur-update',
  templateUrl: './longueur-update.component.html',
  styleUrls: ['./longueur-update.component.scss']
})
export class LongueurUpdateComponent implements OnInit {

  @Input() longueur: Longueur;
  @Input() cotations: Cotation[];
  @Output() longueurUpdatedEvent = new EventEmitter();
  longueurUpdated: Longueur;
  indexCotationMin: number;
  indexCotationMax: number;
  longueurUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.findIndexCotationOption();
    this.initForm();
  }

  initForm() {
    this.longueurUpdateForm = this.formBuilder.group({
      name: this.longueur.name,
      description: this.longueur.description,
      cotationMin: this.cotations[this.indexCotationMin],
      cotationMax: this.cotations[this.indexCotationMax]
    });
  }

  findIndexCotationOption() {
    this.indexCotationMin = findIndexCotation(this.cotations, this.longueur.cotationMin);
    this.indexCotationMax = findIndexCotation(this.cotations, this.longueur.cotationMax);
  }

  onUpdate() {
    const formValue = this.longueurUpdateForm.value;
    this.longueurUpdated = new Longueur(this.longueur.id, formValue.name, formValue.cotationMin, formValue.cotationMax,
      formValue.description);
    this.longueurUpdatedEvent.emit(this.longueurUpdated);
  }

}
