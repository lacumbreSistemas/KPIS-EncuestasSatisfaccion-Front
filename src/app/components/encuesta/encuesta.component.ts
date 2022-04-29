import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncuestaService } from 'src/app/services/encuesta.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  idSucursal!:number
  ContadorEncuestas:number =0
  preguntas:any=[];
  Calificaciones:any=[];
  today = new Date();
  cargando:boolean=false

 Fecha = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
  constructor(private rutaActiva: ActivatedRoute, public es:EncuestaService) { }

  ngOnInit() {
  
    this.idSucursal = Number(this.rutaActiva.snapshot.params.colonial)
    this.es.obtenerPreguntas().subscribe(resp=>{
      this.preguntas=resp
      this.cargando=true

    })
    this.cantidadPreguntas()
  }
  cantidadPreguntas(){
    this.es.obtenerCantPreguntas(this.idSucursal).subscribe((resp:any)=>{
      if (resp.length>0){
        this.ContadorEncuestas = resp[0]?.ContadorPreguntas

      }
      else if (resp.length===0) {
        this.ContadorEncuestas = 0
      }
    
   
    })
  }
 
  obtenerCalificaciones(idPregunta:any,calificacion:any)
  {
      let CalificacionRepetida = this.Calificaciones?.filter((c:any)=>c.idPregunta===idPregunta);
      if (CalificacionRepetida.length===0){

        let puntaje= {
          "idPregunta":idPregunta,
          "Valoracion":Number(calificacion.target.value),
          "Fecha":this.Fecha,
          "Sucursal":this.idSucursal,
          "Comentario":" "
    
    
        }
        this.Calificaciones.push(puntaje);
       
      }

      else {
        this.Calificaciones= this.Calificaciones?.filter((c:any)=>c.idPregunta!=idPregunta);
        let puntaje= {
          "idPregunta":idPregunta,
          "Valoracion":Number(calificacion.target.value),
          "Fecha":this.Fecha,
          "Sucursal":this.idSucursal,
          "Comentario":" "
    
    
        }
        this.Calificaciones.push(puntaje);
   
      }
    

  }
  enviarCalificacion(){
    this.es.registrarCalificacion(this.Calificaciones,this.idSucursal).subscribe(resp=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por su encuesta',
        showConfirmButton: false,
        timer: 1500
      })
    
      window.location.reload();
    });
  }
}
