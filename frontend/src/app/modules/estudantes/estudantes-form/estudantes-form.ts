import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EstudantesService, Estudante } from '../../../core/services/estudantes';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-estudantes-form',
  standalone: true,
  templateUrl: './estudantes-form.html',
  providers: [EstudantesService],
  styleUrls: ['./estudantes-form.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule
  ]
})
export class EstudantesFormComponent {
  // Usando o novo sistema de injeção do Angular 20
  public dialogRef = inject(MatDialogRef<EstudantesFormComponent>);
  public data = inject(MAT_DIALOG_DATA);
  public estudantesService = inject(EstudantesService);
  public snackBar = inject(MatSnackBar);

  estudante: Estudante = {
    cpf: '',
    nome: '',
    dataNascimento: '',
    cep: '',
    logradouro: '',
    numeroCasa: '',
    bairro: '',
    estado: '',
    cidade: '',
    telefone: '',
    email: ''
  };
  
  isLoading = false;

  constructor() {
    // Inicialização movida para o constructor sem parâmetros
    if (this.data?.student) {
      this.estudante = { ...this.data.student };
    }
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.isLoading = true;
      
      if (this.data?.mode === 'edit' && this.estudante.id) {
        // Modo edição - usar PUT
        this.estudantesService.updateEstudante(this.estudante.id, this.estudante)
          .subscribe({
            next: (estudanteAtualizado) => {
              this.showSuccess('Estudante atualizado com sucesso!');
              this.dialogRef.close(estudanteAtualizado);
            },
            error: (erro) => {
              this.handleError('Erro ao atualizar estudante', erro);
            },
            complete: () => {
              this.isLoading = false;
            }
          });
      } else {
        // Modo criação - usar POST
        this.estudantesService.createEstudante(this.estudante)
          .subscribe({
            next: (novoEstudante) => {
              this.showSuccess('Estudante criado com sucesso!');
              this.dialogRef.close(novoEstudante);
            },
            error: (erro) => {
              this.handleError('Erro ao criar estudante', erro);
            },
            complete: () => {
              this.isLoading = false;
            }
          });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    return !!this.estudante.nome && !!this.estudante.cpf && !!this.estudante.email;
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private handleError(message: string, error: any) {
    console.error('Erro:', error);
    let errorMessage = message;
    
    if (error.error?.message) {
      errorMessage += `: ${error.error.message}`;
    } else if (error.message) {
      errorMessage += `: ${error.message}`;
    }
    
    this.snackBar.open(errorMessage, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
    
    this.isLoading = false;
  }
}