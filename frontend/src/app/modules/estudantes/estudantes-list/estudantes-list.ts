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
  name: string;
  phone: string;
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
  displayedColumns: string[] = ['name', 'phone', 'email', 'cpf', 'actions'];
  students: Student[] = [
    { 
      id: 1, 
      name: 'Red Johnson', 
      phone: '+55 41 11111-1111', 
      cpf: '111.111.111-11', 
      email: 'red@email.com',
      dataNascimento: '1990-01-01'
    },
    { 
      id: 2, 
      name: 'Carlos Silva', 
      phone: '+55 41 10336-1038', 
      cpf: '222.222.222-22', 
      email: 'carlos@email.com',
      dataNascimento: '1985-05-15'
    },
    { 
      id: 3, 
      name: 'Maria Garcia', 
      phone: '+55 41 11333-11337', 
      cpf: '333.333.333-33', 
      email: 'maria@email.com',
      dataNascimento: '1992-11-20'
    }
  ];

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
    const confirmDelete = confirm(`Deseja realmente excluir o estudante ${student.name}?`);
    
    if (confirmDelete) {
      this.students = this.students.filter(s => s.id !== student.id);
      this.showSnackbar(`Estudante ${student.name} excluído com sucesso!`);
    }
  }

  scheduleStudent(student: Student): void {
    this.showSnackbar(`Agendamento para ${student.name} criado com sucesso!`);
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
      name: '',
      phone: '',
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
    this.showSnackbar(`Estudante ${student.name} adicionado com sucesso!`);
  }

  private updateStudent(updatedStudent: Student): void {
    this.students = this.students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    );
    this.showSnackbar(`Estudante ${updatedStudent.name} atualizado com sucesso!`);
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