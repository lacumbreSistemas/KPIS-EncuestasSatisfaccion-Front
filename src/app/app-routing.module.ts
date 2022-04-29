import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PuntajesComponent } from './components/puntajes/puntajes.component';

const routes: Routes = [
  {path:'', component:InicioComponent},
  {path:'inicio', component:InicioComponent},
  {path:'encuesta/:colonial', component:EncuestaComponent},
  {path:'puntajes/:colonial', component:PuntajesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
