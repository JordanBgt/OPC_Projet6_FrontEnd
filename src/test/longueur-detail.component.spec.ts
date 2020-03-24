import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongueurDetailComponent } from '../app/entities/longueur/longueur-detail.component';

describe('LongueurDetailComponent', () => {
  let component: LongueurDetailComponent;
  let fixture: ComponentFixture<LongueurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongueurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongueurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
