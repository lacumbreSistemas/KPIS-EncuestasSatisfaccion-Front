import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  //private AppUrl= 'http://localhost:54469/api/encuesta/';
  private AppUrl= 'http://10.10.1.221:8064/api/encuesta/';
  constructor(private http: HttpClient) { }
  obtenerPreguntas(){
    return this.http.get(this.AppUrl+'ObtenerPreguntas');
  }
  obtenerCantPreguntas(sucursal:number){
    return this.http.get(this.AppUrl+'ObtenerCantPreguntas'+'/'+sucursal);
  }
  registrarCalificacion(calificacion:any, sucursal:number){
    console.log('calificacion',calificacion)
    return this.http.post(this.AppUrl+'RegistrarCalificacion'+'/'+sucursal,calificacion);
  }

  obtenerPuntajes(fechaInicio:any, fechaFinal:any, idSucursal:any){

    return this.http.get(this.AppUrl+'ObtenerPuntaje'+'/'+idSucursal+'/'+fechaInicio+'/'+fechaFinal);

  }
  obtenerPorcentaje(fechaInicio:any, fechaFinal:any, idSucursal:any){

    return this.http.get(this.AppUrl+'ObtenerPuntaje'+'/'+idSucursal+'/'+fechaInicio+'/'+fechaFinal);

  }
  ObtenerPorcentajes(fechaInicio:any, fechaFinal:any, idSucursal:any){

    return this.http.get(this.AppUrl+'ObtenerPorcentajes'+'/'+idSucursal+'/'+fechaInicio+'/'+fechaFinal);

  }
  ActualizarPuntaje(id:any, valoracion:any){
  
    return this.http.put(this.AppUrl+'updateEncuesta'+'/'+id+'/'+valoracion,valoracion);

  }

}
