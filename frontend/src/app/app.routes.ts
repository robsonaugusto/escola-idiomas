import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { EstudantesListComponent } from './modules/estudantes/estudantes-list/estudantes-list';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => 
          import('./modules/admin/pages/dashboard/dashboard').then(m => m.DashboardComponent),
        title: 'Dashboard'
      },
      {
        path: 'estudantes',
        loadComponent: () => 
          import('./modules/estudantes/estudantes-list/estudantes-list').then(m => m.EstudantesListComponent),
        title: 'Gestão de Estudantes'
      },
      { 
        path: 'professores', 
        // Supondo que ProfessoresListComponent seja standalone
        loadComponent: () => import('./modules/professores/professores-list/professores-list').then(m => m.ProfessoresList) 
      }
    ]
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' }
];