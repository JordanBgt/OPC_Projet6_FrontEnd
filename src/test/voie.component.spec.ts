import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoieComponent } from '../app/voie/voie.component';

describe('VoieComponent', () => {
  let component: VoieComponent;
  let fixture: ComponentFixture<VoieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
