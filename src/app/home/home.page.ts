import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Variable que almacenará los registros
  personas:any;

  constructor(
    private http: HttpService,
    private alertController: AlertController
  ) {
    this.mostrarDatos();
  }

  mostrarDatos(){
    this.http.mostrarTodos().then( //llamado al método en http.service.ts
      (res) => {
        console.log(res);//imprime registros a consola
         this.personas=res;//los almacena en la variable personas
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }
}
