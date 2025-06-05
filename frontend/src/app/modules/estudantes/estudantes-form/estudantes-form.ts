import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-estudantes-form',
  standalone: true,
  templateUrl: './estudantes-form.html',
  styleUrls: ['./estudantes-form.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class EstudantesFormComponent {
  student: any = {
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

  constructor(
    public dialogRef: MatDialogRef<EstudantesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.student) {
      this.student = { ...data.student };
    }
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.dialogRef.close(this.student);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    return !!this.student.nome && !!this.student.cpf;
  }
}