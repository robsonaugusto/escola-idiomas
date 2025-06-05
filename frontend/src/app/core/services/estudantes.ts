import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudante {
  id?: number;
  cpf: string;
  nome: string;
  dataNascimento: string;
  cep: string;
  logradouro: string;
  numeroCasa: string;
  bairro: string;
  estado: string;
  cidade: string;
  telefone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudantesService {
  private readonly API_URL = 'http://localhost:8080/api/estudantes';

  constructor(private http: HttpClient) { }

  // Buscar todos os estudantes
  getEstudantes(): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(this.API_URL);
  }

  // Buscar estudante por ID
  getEstudanteById(id: number): Observable<Estudante> {
    return this.http.get<Estudante>(`${this.API_URL}/${id}`);
  }

  // Criar novo estudante
  createEstudante(estudante: Estudante): Observable<Estudante> {
    return this.http.post<Estudante>(this.API_URL, estudante);
  }

  // Atualizar estudante
  updateEstudante(id: number, estudante: Estudante): Observable<Estudante> {
    return this.http.put<Estudante>(`${this.API_URL}/${id}`, estudante);
  }

  // Deletar estudante
  deleteEstudante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Buscar por termo
  buscarEstudantes(termo: string): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(`${this.API_URL}/buscar?termo=${termo}`);
  }
}