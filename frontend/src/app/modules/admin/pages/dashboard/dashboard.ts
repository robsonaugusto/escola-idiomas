import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [RouterModule, CommonModule]
})
export class DashboardComponent {
  constructor(private router: Router) { }

  acessar(caminho: string) {
    console.log('Navegando para:', caminho); // Verifique se aparece no console
    this.router.navigate(['/admin', caminho]).catch(err => {
      console.error('Erro de navegação:', err);
    });
  }
}