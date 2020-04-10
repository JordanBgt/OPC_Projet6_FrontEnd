import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoieUpdateComponent } from '../app/entities/voie-update/voie-update.component';

describe('VoieUpdateComponent', () => {
  let component: VoieUpdateComponent;
  let fixture: ComponentFixture<VoieUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoieUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoieUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
