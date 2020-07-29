import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Longueur } from '../shared/model/longueur.model';
import { Cotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { findIndexCotation, findIndexEntity } from '../shared/entity-utils';
import { VoieLight } from '../shared/model/voie-light.model';

/**
 * Component to manage the longueur update form. It will be called by the LongueurDetailComponent
 */

@Component({
  selector: 'app-longueur-update',
  templateUrl: './longueur-update.component.html',
  styleUrls: ['./longueur-update.component.scss']
})
export class LongueurUpdateComponent implements OnInit {

  @Input() longueur: Longueur;
  @Input() cotations: Cotation[];
  @Input() voies: VoieLight[];
  @Output() longueurUpdatedEvent = new EventEmitter();
  longueurUpdated: Longueur;
  indexCotationMin: number;
  indexCotationMax: number;
  longueurUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  /**
   * Find index of the longueur's cotations and init the longueur update form
   */
  ngOnInit() {
    this.findIndexCotationOption();
    this.initForm();
  }

  /**
   * Init the longueur update form with the longueur information
   */
  initForm() {
    this.longueurUpdateForm = this.formBuilder.group({
      name: [this.longueur.name, Validators.required],
      description: [this.longueur.description, Validators.required],
      cotationMin: [this.cotations[this.indexCotationMin], Validators.required],
      cotationMax: [this.cotations[this.indexCotationMax], Validators.required],
      voies: this.voies[findIndexEntity(this.voies, this.longueur.voieId)]
    });
  }

  /**
   * Method to find index of longueurs cotations and select them in the select inputs
   */
  findIndexCotationOption() {
    this.indexCotationMin = findIndexCotation(this.cotations, this.longueur.cotationMin);
    this.indexCotationMax = findIndexCotation(this.cotations, this.longueur.cotationMax);
  }

  /**
   * Emits the updated longueur so that the LongueurDetailComponent sends it to the server
   */
  onUpdate() {
    const formValue = this.longueurUpdateForm.value;
    this.longueurUpdated = new Longueur(this.longueur.id, formValue.name, formValue.cotationMin, formValue.cotationMax,
      formValue.description, this.longueur.userId, formValue.voies.id);
    this.longueurUpdatedEvent.emit(this.longueurUpdated);
  }

}
