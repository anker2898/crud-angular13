import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentarios } from '../interfaces/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private serviceUrl = "https://192.168.31.45:5001/api/Comentario/";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.serviceUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.serviceUrl.concat(id.toString()));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.serviceUrl.concat(id.toString()));
  }

  save(comentario: Comentarios): Observable<any> {
    return this.http.post(this.serviceUrl, comentario);
  }

  update(id: number, comentario: Comentarios): Observable<any> {
    return this.http.put(this.serviceUrl.concat(id.toString()), comentario);
  }
}
