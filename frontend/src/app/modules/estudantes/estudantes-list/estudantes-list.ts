import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EstudantesFormComponent } from '../estudantes-form/estudantes-form';
import { EstudantesService } from '../../../core/services/estudantes';

interface Estudante {
  id?: number;
  nome: string;
  telefone: string;
  cpf: string;
  email: string;
  dataNascimento?: string;
  cep?: string;
  logradouro?: string;
  numeroCasa?: string;
  bairro?: string;
  estado?: string;
  cidade?: string;
}

@Component({
  selector: 'app-estudantes-list',
  standalone: true,
  templateUrl: './estudantes-list.html',
  styleUrls: ['./estudantes-list.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ]
  // Removidos todos os providers - eles não são necessários aqui
})
export class EstudantesListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'cpf', 'actions'];
  estudante: Estudante[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private estudantesService: EstudantesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarEstudantes();
  }

  carregarEstudantes(): void {
    this.estudantesService.getEstudantes().subscribe({
      next: (estudantes) => {
        this.estudante = estudantes;
        this.cdr.detectChanges(); // Notifica explicitamente o Angular sobre a mudança
      },
      error: (error) => {
        console.error('Erro ao carregar estudantes:', error);
        this.showSnackbar('Erro ao carregar estudantes');
      }
    });
  }

  addNewStudent(): void {
    this.openStudentDialog('create');
  }

  editStudent(estudante: Estudante): void {
    this.openStudentDialog('edit', estudante);
  }

  deleteStudent(estudante: Estudante): void {
  if (confirm(`Deseja realmente excluir o estudante ${estudante.nome}?`)) {
    this.estudantesService.deleteEstudante(estudante.id!).subscribe({
      next: () => {
        this.estudante = this.estudante.filter(s => s.id !== estudante.id);
        this.showSnackbar(`Estudante ${estudante.nome} excluído com sucesso!`);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.showSnackbar('Erro ao excluir estudante.');
        console.error(err);
      }
    });
  }
}

  scheduleStudent(estudante: Estudante): void {
    this.showSnackbar(`Agendamento para ${estudante.nome} criado com sucesso!`);
  }

  private openStudentDialog(mode: 'create' | 'edit', estudante?: Estudante): void {
    const dialogRef = this.dialog.open(EstudantesFormComponent, {
      width: '800px',
      data: {
        mode: mode,
        estudante: estudante ? { ...estudante } : this.createEmptyStudent()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'edit') {
          this.updateStudent(result);
        } else {
          this.addStudent(result);
        }
      }
    });
  }

  private createEmptyStudent(): Estudante {
    return {
      nome: '',
      telefone: '',
      cpf: '',
      email: '',
      dataNascimento: '',
      cep: '',
      logradouro: '',
      numeroCasa: '',
      bairro: '',
      estado: '',
      cidade: ''
    };
  }

  private addStudent(estudante: Estudante): void {
    estudante.id = this.generateId();
    this.estudante = [...this.estudante, estudante];
    this.showSnackbar(`Estudante ${estudante.nome} adicionado com sucesso!`);
  }

  private updateStudent(updatedStudent: Estudante): void {
    this.estudante = this.estudante.map(estudante => 
      estudante.id === updatedStudent.id ? updatedStudent : estudante
    );
    this.showSnackbar(`Estudante ${updatedStudent.nome} atualizado com sucesso!`);
  }

  private generateId(): number {
    return this.estudante.length > 0 
      ? Math.max(...this.estudante.map(s => s.id || 0)) + 1 
      : 1;
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}