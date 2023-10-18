import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; 

import { Usuario } from 'src/app/model/Usuario';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresoPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
 
  public usuario: Usuario;

  // CGV: Para poder trabajar con Router y poder navegar hacia la página "home", debemos primero pasar como
  // parámetro e instanciar un objeto de la clase "Router". Fijarse que el tipo de dato, que se pasa 
  // en el constructor es "Router" con mayúscula, porque se trata de una clase y éstas parten con letra 
  // mayúscula, mientras que "router" con minúscula es el objeto de esa clase, que usaremos para ejecutar
  // el método "navigate". La creación de parámetros "private" en el constructor se llama 
  // "Inyección de Dependencia" y es una práctica recomendada en Angular, que permite crear el objeto
  // como una propiedad más de la página y así poder usarla. Por otro lado, la "Inyección de Dependencia"
  // permite compartir una única instancia de dicho objeto en el resto de las páginas que lo usen. Lo
  // anterior es especialmente importante para mantener la coherencia y estados compartidos en los Servicios.
  
  constructor(private router: Router, 
    private toastController: ToastController,
    private animationController: AnimationController) {
    this.usuario = new Usuario('', '', '', '', '','')
  
    // Puedes descomentar cualquiera de los siguientes usuarios, para 
    // hacer tus pruebas y así no tener que digitarlos a cada rato

    // this.usuario.setUsuario('sin.datos@duocuc.cl', '1234');
    this.usuario.setUsuario('atorres@duocuc.cl', '1234');
    // this.usuario.setUsuario('jperez@duocuc.cl', '5678');
    // this.usuario.setUsuario('cmujica@duocuc.cl', '0987');
    // this.usuario.setUsuario('usuario.inexistente@duocuc.cl', '1234');
    // this.usuario.setUsuario('atorres@duocuc.cl', 'password mala');
    // this.usuario.setUsuario('atorres@duocuc.cl', '9999999999999');
    // this.usuario.setUsuario('atorres@duocuc.cl', '9999');
    // this.usuario.setUsuario('correo.malo', '0987');
    // this.usuario.setUsuario('correo.malo@', '0987');
    // this.usuario.setUsuario('correo.malo@duocuc', '0987');
    // this.usuario.setUsuario('correo.malo@duocuc.', '0987');
  }

  public ngOnInit(): void {

    // Puedes descomentar la siguiente línea si quieres que la aplicación navegue directamente
    // a la página Home, así te ahorras de estar apretando el botón "Ingresar" a cada rato
    
    //if (this.usuario.correo !== '') this.ingresar();
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
  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(3000)
        .fromTo('transform', 'translate(-100%)', 'translate(100%)')
        .fromTo('opacity', 1, 1);

      animation.play();
    }
  }

  public ingresar(): void {
    
    if (this.usuario) {
      
      // Validamos el usuario y si hay error no navegaremos a la página Home
      const mensajeError = this.usuario.validarUsuario();
      if (mensajeError) {
        this.mostrarMensaje(mensajeError);
        return;
      }

      // Como la página sólo permite ingresar el correo y la password, vamos a buscar el usuario para completar sus datos
      const usu: Usuario | undefined = this.usuario.buscarUsuarioValido(this.usuario.correo, this.usuario.password);
      
      if (usu) {
        // NavigationExtras sirve para pasarle parámetros a la página Home. Los parámetros se agregan al objeto "state"
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.mostrarMensaje(`¡Bienvenido(a) ${usu.nombre} ${usu.apellido}!`);
        this.router.navigate(['/inicio'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
      }
      else{
        this.mostrarMensaje('Por favor revise correo o contraseña');
      }
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

  public correo() : void{
    this.router.navigate(['/correo'])
  }


}
