import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Secteur } from '../../shared/model/secteur.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VoieLight } from '../../shared/model/voie-light.model';

@Component({
  selector: 'app-secteur-update',
  templateUrl: './secteur-update.component.html',
  styleUrls: ['./secteur-update.component.scss']
})
export class SecteurUpdateComponent implements OnInit {

  @Input() secteur: Secteur;
  @Input() voies: VoieLight[];
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
      voies: ['']
    });
  }

  onUpdate() {
    const formValue = this.secteurUpdateForm.value;
    this.secteurUpdated = new Secteur(this.secteur.id, formValue.name, formValue.voies, formValue.description);
    this.secteurUpdatedEvent.emit(this.secteurUpdated);
  }

  compareObjects(o1: VoieLight, o2: VoieLight): boolean {
    return o1.id === o2.id;
  }
}
