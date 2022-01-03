import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif, Images } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key: string = 'SDYvd344GO6wrMxfjjpTqQ0MIefHI5bU';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  private limit: number = 10;


  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    this._historial = JSON.parse( localStorage.getItem( 'historial' )! ) || [];
    this.resultados = JSON.parse( localStorage.getItem( 'resultados')! ) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

    // resultados
  }

  buscarGifs( query: string = ''){

    query = query.trim().toLowerCase();
    
    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
      
    }

    const params = new HttpParams()
      .set( 'api_key', this.api_key)
      .set( 'limit', '10')
      .set( 'q', query );

    this.http.get<SearchGifsResponse>( `${ this.servicioUrl }/search`, { params } )
        .subscribe( ( resp ) => {
          console.log( resp.data );
          this.resultados = resp.data;
          localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
        });    
  }
}