import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongueurComponent } from '../app/longueur/longueur.component';

describe('LongueurComponent', () => {
  let component: LongueurComponent;
  let fixture: ComponentFixture<LongueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
