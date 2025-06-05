// estudantes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudantesService {
  private apiUrl = `${environment.apiUrl}/estudantes`;

  constructor(private http: HttpClient) { }

  criarEstudante(estudante: any): Observable<any> {
    return this.http.post(this.apiUrl, estudante);
  }

  atualizarEstudante(id: number, estudante: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, estudante);
  }

  buscarEstudante(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}