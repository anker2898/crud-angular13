import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComentarioComponent } from './components/form-comentario/form-comentario.component';
import { ListaComentariosComponent } from './components/lista-comentarios/lista-comentarios.component';

const routes: Routes = [
  {
    path: '',
    component: ListaComentariosComponent
  },
  {
    path: 'details',
    component: FormComentarioComponent
  },
  {
    path: 'details/:id',
    component: FormComentarioComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
