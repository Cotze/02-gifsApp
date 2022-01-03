import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key: string = 'SDYvd344GO6wrMxfjjpTqQ0MIefHI5bU';

  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){}

  buscarGifs( query: string = ''){

    query = query.trim().toLowerCase();
    
    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    this.http.get( 'https://api.giphy.com/v1/gifs/search?api_key=SDYvd344GO6wrMxfjjpTqQ0MIefHI5bU&q=one piece&limit=10' )
        .subscribe( ( resp: any ) => {
          console.log( resp.data );
        });    
  }
}