import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  constructor( 
    private gifsServices: GifsService ) { }

  get historial(){
    return this.gifsServices.historial;
  }

  buscar( termino: string){
    this.gifsServices.buscarGifs( termino );
    
  }

}
