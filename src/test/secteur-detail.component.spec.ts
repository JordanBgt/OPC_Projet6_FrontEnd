import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurDetailComponent } from '../app/secteur-detail/secteur-detail.component';

describe('SecteurDetailComponent', () => {
  let component: SecteurDetailComponent;
  let fixture: ComponentFixture<SecteurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecteurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
