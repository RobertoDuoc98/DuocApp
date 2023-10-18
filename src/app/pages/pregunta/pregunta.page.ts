import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public usuario: Usuario;

   constructor(
        private activeroute: ActivatedRoute // Permite obtener los parámetros de la página login
      , private router: Router // Permite navegar entre páginas
      , private alertController: AlertController // Permite mostrar mensajes emergentes más complejos que Toast
      , private animationController: AnimationController
      , private toastController: ToastController) { // Permite crear animaciones con  
        

    this.usuario = new Usuario('', '', '', '', '', '');

    // Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          }
          return;
        }
    
      // Si no vienen datos extra desde la página anterior, quiere decir que el usuario
      // intentó entrar directamente a la página home sin pasar por el login,
      // de modo que el sistema debe enviarlo al login para que inicie sesión.
      this.router.navigate(['/ingresar']);

    });
  }

  public ngOnInit(): void {

  }


  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(1)
        .duration(3000)
        .fromTo('transform', 'translate(0%)', 'translate(45%)')
        .fromTo('opacity', 0.2, 1);

      animation.play();
    }
  }

  public animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }


  // Este método sirve para mostrar un mensaje emergente
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  public ingresar(): void {

    if(!this.validarUsuario(this.usuario)) {
      return;
    }
   
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/correcto'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
  }
  /*
    Usaremos validateModel para verificar que se cumplan las validaciones de los campos del formulario
  */
  public validarUsuario(usuario: Usuario) {

    const usu = this.usuario.MostrarContraseña(this.usuario.correo,this.usuario.respuesta);

    if (usu) {
      return true;
    }
    else{
      this.router.navigate(['/incorrecto']);
      return false;
      }
  }
  async mostrarMensaje(mensaje: string, duracion?: number) {
    // Permite mostrar un mensaje emergente que dura unos pocos segundos y desaparece. El mensaje es asincrónico, 
    // los que permite que el mensaje se pueda ver incluso cuando ya ha cambiado a la siguiente página.
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
  public ingreso() : void{
    this.router.navigate(['/ingreso'])
  }
}


