import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoDetailComponent } from '../app/topo-detail/topo-detail.component';

describe('TopoDetailComponent', () => {
  let component: TopoDetailComponent;
  let fixture: ComponentFixture<TopoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
