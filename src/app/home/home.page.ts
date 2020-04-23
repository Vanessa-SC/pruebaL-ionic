import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { AlertController, ToastController } from '@ionic/angular';

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
    private alertController: AlertController,
    private toastController: ToastController
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

  borrar(persona){
    this.http.borrar(persona.idPersonaPersona).then(
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "eliminado"){
          this.alerta("Eliminado correctamente");
        } else {
          this.alerta("No se pudo eliminar, intente mas tarde");
        }
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  async alerta(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  editar(idPersona, nombre, edad){
    this.http.updateP(idPersona, nombre, edad).then(
      (inv) => {
        console.log(inv);
        var estado = inv['resultado'];
        if (estado == "actualizado"){
          this.alerta("Actualizado con éxito.");

        } else {
          this.alerta("No se pudo actualizar, intente mas tarde");
        }
      },
      (error) => {
        console.log("Error" + JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }  

  async actualizar( persona ) {
    let alert = this.alertController.create({
      header: 'Actualizar',
      inputs: [
        {
          label: 'Nombre',
          name: 'nombre',
          placeholder: 'Nombre',
          value: persona.nombre,
          type: 'text'
        },
        {
          label: 'Edad',
          name: 'edad',
          value: persona.edad,
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.editar(persona.idPersona,data.nombre,data.edad);
          }
        }
      ]
    });
    (await alert).present();
  }
}
