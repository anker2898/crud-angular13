import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentarios } from 'src/app/interfaces/comentarios';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-form-comentario',
  templateUrl: './form-comentario.component.html',
  styleUrls: ['./form-comentario.component.css']
})
export class FormComentarioComponent implements OnInit {

  form: FormGroup;
  comentario: Comentarios | undefined;
  id: any;

  constructor(private service: ComentarioService,
    private aRoute: ActivatedRoute,
    private router: Router) {
    this.form = this.getFields()
    this.id = aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) this.getComentario();
  }

  protected getFields(): FormGroup {
    let form;
    if (this.id && this.comentario != undefined) {
      form = new FormGroup({
        id: new FormControl({ value: this.comentario?.id, disabled: false }, []),
        titulo: new FormControl({ value: this.comentario?.titulo, disabled: false }, [Validators.required]),
        texto: new FormControl({ value: this.comentario?.texto, disabled: false }, [Validators.required]),
        creador: new FormControl({ value: this.comentario?.creador, disabled: false }, [Validators.required]),
        fecha: new FormControl({ value: this.getFormatDate(), disabled: false }, [Validators.required])
      });
    } else {
      form = new FormGroup({
        titulo: new FormControl({ value: '', disabled: false }, [Validators.required]),
        texto: new FormControl({ value: '', disabled: false }, [Validators.required]),
        creador: new FormControl({ value: '', disabled: false }, [Validators.required]),
        fecha: new FormControl({ value: this.getFormatDate(), disabled: false }, [Validators.required])
      });
    }
    return form;
  }

  getFormatDate() {
    let fecha = this.comentario != null ? this.comentario.fechaCreacion : new Date();
    let day = fecha.getDate() <= 9 ? '0' + fecha.getDate().toString() : fecha?.getDate().toString();
    let month = fecha.getMonth() + 1 <= 9 ? '0' + (fecha.getMonth() + 1).toString() : (fecha.getMonth() + 1).toString();
    let year = fecha.getFullYear().toString();
    console.log(year + '-' + month + '-' + day);

    return year + '-' + month + '-' + day;
  }

  getComentario() {
    this.service.getById(this.id).subscribe(data => {
      if (data) {
        this.comentario = {
          id: data.id,
          creador: data.creador,
          fechaCreacion: new Date(data.fecha),
          texto: data.texto,
          titulo: data.titulo
        }
        this.form = this.getFields();
      }
    });
  }

  public guardar() {
    let request = this.form.getRawValue();
    console.log(request);
    request.fecha = new Date(request.fecha.toString()).toISOString();
    if (this.id) {
      this.service.update(this.id, request).subscribe(data => {
        this.router.navigate(['/']);
      });
    } else {
      this.service.save(request).subscribe(data => {
        this.router.navigate(['/']);
      });
    }
  }

}
