import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.page.html',
  styleUrls: ['./add-persona.page.scss'],
})
export class AddPersonaPage implements OnInit {

  nombre:string;
  edad:string;

  constructor(public http:HttpService, 
    public route: Router, 
    public toastController: ToastController) { }

  ngOnInit() {
  }

  guardarPersona(){
    console.log(this.nombre+', '+this.edad);
    if(this.nombre != undefined && this.edad != undefined){
      this.guardar();
    } else {
      this.alerta('Hay campos importantes sin llenar');
    }
  }
  guardar(){
    console.log(this.nombre+', '+this.edad);
    this.http.insertar(this.nombre,this.edad).then(
      (inv) => {
        console.log(inv);
        var resultado;

        resultado = inv['resultado'];
        if(resultado == "insertado"){
 
          this.mensajeToast("Persona registrada correctamente.");
          this.route.navigateByUrl('/home');
 
        }else{
          this.mensajeToast("A ocurrido un error intenta mas tarde, o verifica tu conexion a internet");
        }
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }
  async alerta(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'middle',
      duration: 4000
    });
    toast.present();
  }

  async mensajeToast(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'top',
      duration: 2000
    });
    toast.present();

  }

}
