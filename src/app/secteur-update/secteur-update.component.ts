import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Secteur } from '../shared/model/secteur.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpotLight } from '../shared/model/spot-light.model';
import { findIndexEntity } from '../shared/entity-utils';

/**
 * Component to manage the secteur update form. It will be called by the SecteurDetailComponent
 */

@Component({
  selector: 'app-secteur-update',
  templateUrl: './secteur-update.component.html',
  styleUrls: ['./secteur-update.component.scss']
})
export class SecteurUpdateComponent implements OnInit {

  @Input() secteur: Secteur;
  @Input() spots: SpotLight[];
  @Output() secteurUpdatedEvent = new EventEmitter();
  secteurUpdated: Secteur;
  secteurUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initializes secteur update form
   */
  initForm() {
    this.secteurUpdateForm = this.formBuilder.group({
      name: [this.secteur.name, Validators.required],
      description: [this.secteur.description, Validators.required],
      spots: this.spots[findIndexEntity(this.spots, this.secteur.spotId)]
    });
  }

  /**
   * Emits the updated secteur so that the SecteurDetailComponent sends it to the server
   */
  onUpdate() {
    const formValue = this.secteurUpdateForm.value;
    this.secteurUpdated = new Secteur(this.secteur.id, formValue.name, formValue.description, this.secteur.userId, formValue.spots.id);
    this.secteurUpdatedEvent.emit(this.secteurUpdated);
  }
}
