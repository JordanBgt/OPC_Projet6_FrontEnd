import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Secteur } from '../shared/model/secteur.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VoieLight } from '../shared/model/voie-light.model';
import { SpotLight } from '../shared/model/spot-light.model';
import { findIndexEntity } from '../shared/entity-utils';

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

  initForm() {
    this.secteurUpdateForm = this.formBuilder.group({
      name: this.secteur.name,
      description: this.secteur.description,
      spots: this.spots[findIndexEntity(this.spots, this.secteur.spotId)]
    });
  }

  onUpdate() {
    const formValue = this.secteurUpdateForm.value;
    this.secteurUpdated = new Secteur(this.secteur.id, formValue.name, formValue.description, this.secteur.userId, formValue.spots.id);
    this.secteurUpdatedEvent.emit(this.secteurUpdated);
  }
}
