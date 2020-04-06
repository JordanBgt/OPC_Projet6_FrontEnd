import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cotation } from '../../shared/model/cotation.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Topo } from '../../shared/model/topo.model';
import { SpotLight } from '../../shared/model/spot-light.model';

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
    this.indexCotationMin = this.cotations.findIndex(cotation => cotation.id === this.topo.cotationMin.id);
    this.indexCotationMax = this.cotations.findIndex(cotation => cotation.id === this.topo.cotationMax.id);
  }

  onUpdate() {
    const formValue = this.topoUpdateForm.value;
    this.topoUpdated = new Topo(this.topo.id, formValue.name, formValue.description, formValue.cotationMin,
      formValue.cotationMax, formValue.isAvailable, formValue.country, formValue.region, formValue.spots,
      this.topo.creatorId, this.topo.tenantId, this.topo.publicationDate, this.topo.photo);
    this.topoUpdatedEvent.emit(this.topoUpdated);
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
}
