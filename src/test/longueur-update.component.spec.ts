import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongueurUpdateComponent } from '../app/longueur-update/longueur-update.component';

describe('LongueurUpdateComponent', () => {
  let component: LongueurUpdateComponent;
  let fixture: ComponentFixture<LongueurUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongueurUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongueurUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
