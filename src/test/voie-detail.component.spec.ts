import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoieDetailComponent } from '../app/entities/voie/voie-detail.component';

describe('VoieDetailComponent', () => {
  let component: VoieDetailComponent;
  let fixture: ComponentFixture<VoieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoieDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
