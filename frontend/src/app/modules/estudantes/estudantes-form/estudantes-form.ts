import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

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
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  providers: [
    MatDatepickerModule,           // necessário
    MatNativeDateModule,           // necessário
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // opcional: define o formato da data
  ]
})
export class EstudantesFormComponent {
  student: any = {
    cpf: '',
    name: '',
    dataNascimento: null,
    cep: '',
    logradouro: '',
    numeroCasa: '',
    bairro: '',
    estado: '',
    cidade: '',
    phone: '',
    email: ''
  };

  constructor(
    public dialogRef: MatDialogRef<EstudantesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adapter: DateAdapter<any> // força a injeção do DateAdapter
  ) {
    if (data?.student) {
      this.student = { ...data.student };
    }

    // Define o idioma aqui também (pt-BR)
    this.adapter.setLocale('pt-BR');
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
    return !!this.student.name && !!this.student.cpf;
  }
}
