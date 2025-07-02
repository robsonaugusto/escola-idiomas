// em /frontend/src/app/core/services/professores.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Crie uma interface Professor em um arquivo de models
import { Professor } from '../core/models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {
  private apiUrl = 'http://localhost:8080/api/professores';

  constructor(private http: HttpClient) { }

  getProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  // --- MÉTODO CORRIGIDO ---
  // Substituímos o método que lançava o erro por este, que faz a chamada à API.
  deleteProfessor(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`; // Constrói a URL, ex: /api/professores/1
    return this.http.delete<void>(url); // Executa o DELETE e retorna um Observable
  }

  // Futuramente, você pode adicionar os métodos para criar e atualizar aqui
}