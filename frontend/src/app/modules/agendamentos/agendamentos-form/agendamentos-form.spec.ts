import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentosForm } from './agendamentos-form';

describe('AgendamentosForm', () => {
  let component: AgendamentosForm;
  let fixture: ComponentFixture<AgendamentosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendamentosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendamentosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
