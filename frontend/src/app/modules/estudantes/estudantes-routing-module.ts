import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudantesListComponent } from './estudantes-list/estudantes-list';
import { EstudantesFormComponent } from './estudantes-form/estudantes-form';

const ESTUDANTES_ROUTES: Routes = [
  {
    path: '', // Relativo a '/estudantes'
    component: EstudantesListComponent
  },
  {
    path: 'novo', // Relativo a '/estudantes/novo'
    component: EstudantesFormComponent
  },
  {
    path: 'editar/:id', // Relativo a '/estudantes/editar/1'
    component: EstudantesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ESTUDANTES_ROUTES)],
  exports: [RouterModule]
})
export class EstudantesRoutingModule { }