import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Libro } from '../interfaces/libro.interfaces';
import { LibrosService } from '../servicios/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  listaLibros: Libro[] = []; //Aqui se guarda la lista de libros
  cargando: boolean = false; //Esta variable muestra la animacion de carga
  dialogoVisible: boolean = false; //Indica si el dialogo esta visible u oculto
  
  mensajes:Message[] = [];


  constructor(
    private servioLibros: LibrosService
  ) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void{
    this.cargando = true;
    this.servioLibros.get().subscribe({
      next: (datos) =>{
        this.listaLibros = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
        this.mensajes =[{severity: 'error', summary: 'Error al cargar libros', detail: e.error}]
      }
    });
  }

  mostrarDialogo(){
    this.dialogoVisible = true;
  }

}
