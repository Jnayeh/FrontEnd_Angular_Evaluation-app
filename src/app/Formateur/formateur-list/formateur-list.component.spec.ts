import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurListComponent } from './formateur-list.component';

describe('FormateurListComponent', () => {
  let component: FormateurListComponent;
  let fixture: ComponentFixture<FormateurListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormateurListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormateurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
