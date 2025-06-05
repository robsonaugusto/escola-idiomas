import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentosList } from './agendamentos-list';

describe('AgendamentosList', () => {
  let component: AgendamentosList;
  let fixture: ComponentFixture<AgendamentosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendamentosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendamentosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
