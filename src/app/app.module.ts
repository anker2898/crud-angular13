import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComentarioComponent } from './components/form-comentario/form-comentario.component';
import { ListaComentariosComponent } from './components/lista-comentarios/lista-comentarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComentarioComponent,
    ListaComentariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
