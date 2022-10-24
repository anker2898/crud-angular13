import { Component, OnInit } from '@angular/core';
import { Comentarios } from 'src/app/interfaces/comentarios';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-lista-comentarios',
  templateUrl: './lista-comentarios.component.html',
  styleUrls: ['./lista-comentarios.component.css']
})
export class ListaComentariosComponent implements OnInit {

  listaComentario: Comentarios[] = [];

  constructor(private service: ComentarioService) { }

  ngOnInit(): void {
    this.getListaComentario();
  }

  getListaComentario() {
    this.listaComentario = [];
    this.service.getAll().subscribe(data => {
      if ((data as Array<any>).length > 0) {
        (data as Array<any>).forEach(item => {
          let comentario: Comentarios = {
            id: item.id,
            creador: item.creador,
            fechaCreacion: new Date(item.fecha),
            texto: item.fecha,
            titulo: item.titulo
          }
          this.listaComentario.push(comentario);
        })
      }
    });
  }

  deleteItem(id: any) {
    this.service.delete(id).subscribe(data => this.getListaComentario());
  }

}
