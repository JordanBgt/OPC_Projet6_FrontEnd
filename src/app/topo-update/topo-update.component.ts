import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cotation } from '../shared/model/cotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Topo } from '../shared/model/topo.model';
import { SpotLight } from '../shared/model/spot-light.model';
import { findIndexCotation } from '../shared/entity-utils';

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

  findIndexCotationOption() {
    this.indexCotationMin = findIndexCotation(this.cotations, this.topo.cotationMin);
    this.indexCotationMax = findIndexCotation(this.cotations, this.topo.cotationMax);
  }

  onUpdate() {
    const formValue = this.topoUpdateForm.value;
    this.topoUpdated = new Topo({id: this.topo.id, name: formValue.name, description: formValue.description,
      cotationMin : formValue.cotationMin, cotationMax: formValue.cotationMax, isAvailable: formValue.isAvailable,
      country: formValue.country, region: formValue.region, spots: formValue.spots, creatorId: this.topo.creatorId,
      tenantId: this.topo.tenantId, publicationDate: this.topo.publicationDate, photo: this.topo.photo});
    this.topoUpdatedEvent.emit(this.topoUpdated);
  }

  compareObjects(o1: SpotLight, o2: SpotLight): boolean {
    return o1.id === o2.id;
  }
}
