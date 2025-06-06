import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EstudantesFormComponent } from '../estudantes-form/estudantes-form';

interface Student {
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
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class EstudantesListComponent {
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'cpf', 'actions'];
  students: Student[] = []; // Array vazio - sem dados fixos

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  addNewStudent(): void {
    this.openStudentDialog('create');
  }

  editStudent(student: Student): void {
    this.openStudentDialog('edit', student);
  }

  deleteStudent(student: Student): void {
    const confirmDelete = confirm(`Deseja realmente excluir o estudante ${student.nome}?`);
    
    if (confirmDelete) {
      this.students = this.students.filter(s => s.id !== student.id);
      this.showSnackbar(`Estudante ${student.nome} excluído com sucesso!`);
    }
  }

  scheduleStudent(student: Student): void {
    this.showSnackbar(`Agendamento para ${student.nome} criado com sucesso!`);
    // Implemente a lógica de agendamento aqui
  }

  private openStudentDialog(mode: 'create' | 'edit', student?: Student): void {
    const dialogRef = this.dialog.open(EstudantesFormComponent, {
      width: '800px',
      data: {
        mode: mode,
        student: student ? { ...student } : this.createEmptyStudent()
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

  private createEmptyStudent(): Student {
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

  private addStudent(student: Student): void {
    student.id = this.generateId();
    this.students = [...this.students, student];
    this.showSnackbar(`Estudante ${student.nome} adicionado com sucesso!`);
  }

  private updateStudent(updatedStudent: Student): void {
    this.students = this.students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    );
    this.showSnackbar(`Estudante ${updatedStudent.nome} atualizado com sucesso!`);
  }

  private generateId(): number {
    return this.students.length > 0 
      ? Math.max(...this.students.map(s => s.id || 0)) + 1 
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