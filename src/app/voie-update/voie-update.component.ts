import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cotation } from '../shared/model/cotation.model';
import { Voie } from '../shared/model/voie.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { findIndexCotation, findIndexEntity } from '../shared/entity-utils';
import { SecteurLight } from '../shared/model/secteur-light.model';

/**
 * Component to manage the voie update form. It will be called by the VoieDetailComponent
 */

@Component({
  selector: 'app-voie-update',
  templateUrl: './voie-update.component.html',
  styleUrls: ['./voie-update.component.scss']
})
export class VoieUpdateComponent implements OnInit {

  @Input() voie: Voie;
  @Input() cotations: Cotation[];
  @Input() secteurs: SecteurLight[];
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

  /**
   * Initializes the voie update form with the spot information
   */
  initForm() {
    this.voieUpdateForm = this.formBuilder.group({
      name: [this.voie.name, Validators.required],
      description: [this.voie.description, Validators.required],
      cotationMin: [this.cotations[this.indexCotationMin], Validators.required],
      cotationMax: [this.cotations[this.indexCotationMax], Validators.required],
      secteurs: this.secteurs[findIndexEntity(this.secteurs, this.voie.secteurId)]
    });
  }

  /**
   * Method to find index of voie cotations and select them in the select inputs
   */
  findIndexCotationOption() {
    this.indexCotationMin = findIndexCotation(this.cotations, this.voie.cotationMin);
    this.indexCotationMax = findIndexCotation(this.cotations, this.voie.cotationMax);
  }

  /**
   * Emits the updated voie so that the VoieDetailComponent sends it to the server
   */
  onUpdate() {
    const formValue = this.voieUpdateForm.value;
    this.voieUpdated = new Voie(this.voie.id, formValue.name, formValue.cotationMin, formValue.cotationMax,
      formValue.description, this.voie.userId, formValue.secteurs.id);
    this.voieUpdatedEvent.emit(this.voieUpdated);
  }
}
