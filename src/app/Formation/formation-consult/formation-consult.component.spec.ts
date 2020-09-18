import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationConsultComponent } from './formation-consult.component';

describe('FormationConsultComponent', () => {
  let component: FormationConsultComponent;
  let fixture: ComponentFixture<FormationConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
