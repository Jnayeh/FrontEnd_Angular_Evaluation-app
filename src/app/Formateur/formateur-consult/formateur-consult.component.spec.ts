import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurConsultComponent } from './formateur-consult.component';

describe('FormateurConsultComponent', () => {
  let component: FormateurConsultComponent;
  let fixture: ComponentFixture<FormateurConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormateurConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateurConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
