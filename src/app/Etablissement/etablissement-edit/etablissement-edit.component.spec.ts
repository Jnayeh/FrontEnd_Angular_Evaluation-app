import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementEditComponent } from './etablissement-edit.component';

describe('EtablissementEditComponent', () => {
  let component: EtablissementEditComponent;
  let fixture: ComponentFixture<EtablissementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
