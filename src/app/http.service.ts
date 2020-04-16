import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';//IMPORTAR

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //AGREGAR AL CONSTRUCTOR
  constructor(public http: HttpClient) { }

  //ESTABLECER VARIABLE CON LA URL DONDE ESTA 
  //CORRIENDO LARAVEL
  httpConexion = "http://127.0.0.1:8000/";

  // FUNCION QUE RECIBE LOS PARAMETROS NECESARIOS
  insertar(nombre: string,edad: string) {
    // Complementamos la URL con la ruta
    // creada en laravel
    var url = this.httpConexion + 'insertar/' + nombre + '/' + edad ;
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }



}
