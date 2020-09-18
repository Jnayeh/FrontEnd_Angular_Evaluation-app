import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurFormComponent } from './formateur-form.component';

describe('FormateurFormComponent', () => {
  let component: FormateurFormComponent;
  let fixture: ComponentFixture<FormateurFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormateurFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
