import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoUpdateComponent } from '../app/entities/topo/topo-update.component';

describe('TopoUpdateComponent', () => {
  let component: TopoUpdateComponent;
  let fixture: ComponentFixture<TopoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
