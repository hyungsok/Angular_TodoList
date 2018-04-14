import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AugularComponent } from './augular.component';

describe('AugularComponent', () => {
  let component: AugularComponent;
  let fixture: ComponentFixture<AugularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AugularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AugularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
