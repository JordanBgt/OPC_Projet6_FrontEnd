import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Topo } from '../shared/model/topo.model';
import { SpotLight } from '../shared/model/spot-light.model';
import { findIndexCotation } from '../shared/entity-utils';

/**
 * Component to manage the topo update form. It will be called by the TopoDetailComponent
 */

@Component({
  selector: 'app-topo-update',
  templateUrl: './topo-update.component.html',
  styleUrls: ['./topo-update.component.scss']
})
export class TopoUpdateComponent implements OnInit {

  @Input() topo: Topo;
  @Input() cotations: Cotation[];
  @Input() spots: SpotLight[];
  @Output() topoUpdatedEvent = new EventEmitter<Topo>();
  topoUpdated: Topo;
  indexCotationMin: number;
  indexCotationMax: number;
  topoUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.findIndexCotationOption();
    this.initForm();
  }

  /**
   * Initializes the topo update form with the topo information
   */
  initForm() {
    this.topoUpdateForm = this.formBuilder.group({
      name: this.topo.name,
      description: this.topo.description,
      cotationMin: this.cotations[this.indexCotationMin],
      cotationMax: this.cotations[this.indexCotationMax],
      isAvailable: this.topo.cotationMax,
      country: this.topo.country,
      region: this.topo.region,
      spots: ['']
    });
  }

  /**
   * Method to find index of topo cotations and select them in the select inputs
   */
  findIndexCotationOption() {
    this.indexCotationMin = findIndexCotation(this.cotations, this.topo.cotationMin);
    this.indexCotationMax = findIndexCotation(this.cotations, this.topo.cotationMax);
  }

  /**
   * Emits the updated topo so that the TopoDetailComponent sends it to the server
   */
  onUpdate() {
    const formValue = this.topoUpdateForm.value;
    this.topoUpdated = new Topo({id: this.topo.id, name: formValue.name, description: formValue.description,
      country: formValue.country, region: formValue.region, spots: formValue.spots, creatorId: this.topo.creatorId,
      publicationDate: this.topo.publicationDate, photo: this.topo.photo, cotationMin: formValue.cotationMin,
      cotationMax: formValue.cotationMax});
    this.topoUpdatedEvent.emit(this.topoUpdated);
  }

  /**
   * Method to compare two spots in order to know if they have the same id. It's used to preselect in the list of spots,
   * spots already linked to the topo
   * @param o1 spot one
   * @param o2 spot two
   */
  compareObjects(o1: SpotLight, o2: SpotLight): boolean {
    return o1.id === o2.id;
  }
}
