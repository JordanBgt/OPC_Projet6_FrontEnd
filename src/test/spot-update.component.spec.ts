import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotUpdateComponent } from '../app/entities/spot-update/spot-update.component';

describe('SpotUpdateComponent', () => {
  let component: SpotUpdateComponent;
  let fixture: ComponentFixture<SpotUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
