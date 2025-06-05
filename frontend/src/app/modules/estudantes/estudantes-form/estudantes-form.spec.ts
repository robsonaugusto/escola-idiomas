import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesForm } from './estudantes-form';

describe('EstudantesForm', () => {
  let component: EstudantesForm;
  let fixture: ComponentFixture<EstudantesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudantesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudantesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
