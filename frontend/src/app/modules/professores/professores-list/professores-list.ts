import { Component, OnInit } from '@angular/core';
import { Professor } from '../../../core/core/models/professor.model';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProfessoresService } from '../../../core/services/professores';

// --- 1. IMPORTE O MÓDULO DO CARD AQUI ---
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-professores-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule // <-- 2. ADICIONE O MÓDULO AQUI
  ],
  templateUrl: './professores-list.html',
  styleUrl: './professores-list.scss'
})
export class ProfessoresList implements OnInit {

  professores: Professor[] = [];
  displayedColumns: string[] = ['nome', 'especialidade', 'status', 'acoes'];

  constructor(
    private professoresService: ProfessoresService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarProfessores();
  }

  carregarProfessores(): void {
    this.professoresService.getProfessores().subscribe(data => {
      this.professores = data;
    });
  }

  abrirFormulario(): void {
    // Lógica para abrir o modal de criação
  }

  editarProfessor(professor: Professor): void {
    // Lógica para abrir o modal de edição
  }

  excluirProfessor(professor: Professor): void {
    if (confirm(`Deseja realmente excluir o professor ${professor.nome}?`)) {
      this.professoresService.deleteProfessor(professor.id!).subscribe({
        next: () => {
          console.log('Professor excluído com sucesso');
          this.professores = this.professores.filter(p => p.id !== professor.id);
        },
        error: (err) => console.error('Erro ao excluir professor', err)
      });
    }
  }
}