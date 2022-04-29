import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { EncuestaService } from 'src/app/services/encuesta.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class PuntajesComponent implements OnInit {
  idSucursal!:number
  Calificaciones:any=[];
  Calificacion:any
  NombrePregunta:any
  idPregunta:any
  FechaDesde:any
  FechaHasta:any
  constructor(private rutaActiva: ActivatedRoute,
              public es:EncuestaService,
              config: NgbModalConfig, private modalService: NgbModal) {
                config.backdrop = 'static';
                config.keyboard = false;
               }

  ngOnInit() {
    this.idSucursal = Number(this.rutaActiva.snapshot.params.colonial)
  }

  open(content:any, calificacion:any) {
    this.modalService.open(content);
    this.Calificacion = calificacion.Valoracion,
    this.NombrePregunta = calificacion.Nombre
    this.idPregunta = calificacion.id

  }

  editarCalificacion(calificacion:any){
    console.log('FechaDesde',this.FechaDesde)
    console.log('FechaHasta',this.FechaHasta)
    this.es.ActualizarPuntaje(this.idPregunta,calificacion).subscribe(resp=>{
      this.ObtenerCalificaciones(this.FechaDesde,this.FechaHasta);
    })
  }

  ObtenerCalificaciones(desde:any,hasta:any){  
    this.FechaDesde=desde,
    this.FechaHasta=hasta

    this.es.obtenerPuntajes(desde,hasta,this.idSucursal).subscribe(resp=>{
      this.Calificaciones = resp
    })
  }
}
