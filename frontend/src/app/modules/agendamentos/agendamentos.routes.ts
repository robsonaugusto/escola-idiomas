import { Routes } from '@angular/router';
import { AgendamentosList } from './agendamentos-list/agendamentos-list'; // nome correto da classe

export const AGENDAMENTOS_ROUTES: Routes = [
  {
    path: '',
    component: AgendamentosList, // classe correta
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./agendamentos-form/agendamentos-form').then(m => m.AgendamentosForm), // sem "Component"
  }
];
