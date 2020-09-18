import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementConsultComponent } from './etablissement-consult.component';

describe('EtablissementConsultComponent', () => {
  let component: EtablissementConsultComponent;
  let fixture: ComponentFixture<EtablissementConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
