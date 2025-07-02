import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importe o CommonModule

// Supondo que você já importe os módulos do Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-professor',
  standalone: true,
  imports: [
    CommonModule, // 2. Adicione aqui
    MatCardModule,
    MatButtonModule
    // ... outros módulos que você usa no template
  ],
  templateUrl: './dashboard-professor.html',
  styleUrl: './dashboard-professor.scss'
})
export class DashboardProfessor {
  aulasDoDia: any[] = []; // Seus dados aqui
  historico: any[] = [];   // Seus dados aqui

  // ... sua lógica
}