import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AnimationController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';

import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistrarmePage implements OnInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  usuario = new Usuario();
  repeticionPassword = '';

  constructor(private router: Router,
    private authService: AuthService,
    private toastController: ToastController, 
    private bd: DataBaseService,
    private animationController: AnimationController) { }

    ngOnInit() {
    }
  
    async registrarUsuario() {
      // Validar campos
      if (!this.validarCampos()) {
        await showToast('Por favor, complete todos los campos.');
        return;
    }
  
      // Verificar si el correo electrónico ya está registrado
      const usuarioExistente = await this.bd.validarCorreo(this.usuario.correo);
      if (usuarioExistente) {
        showToast('Este correo electrónico ya está registrado. Por favor, use otro.');
        return;
      }
  
      // Guardar el nuevo usuario en la base de datos
      try {
        await this.bd.guardarUsuario(this.usuario);
        console.log('Usuario registrado con éxito', this.usuario);
         showToast('Usuario registrado con éxito');
  
        this.router.navigate(['/ingreso']);
      } catch (error) {
        console.error('Error al registrar usuario', error);
      }
    }
  
    validarCampo(nombreCampo: string, valor: string) {
      if (valor.trim() === '') {
        showToast(`Debe ingresar un valor para el campo "${nombreCampo}".`);
        return false;
      }
      return true;
    }
  
    validarCampos(): boolean {
      if (!this.validarCampo('nombre', this.usuario.nombre) ||
          !this.validarCampo('apellidos', this.usuario.apellido) ||
          !this.validarCampo('correo', this.usuario.correo) ||
          !this.validarCampo('pregunta secreta', this.usuario.preguntaSecreta) ||
          !this.validarCampo('respuesta secreta', this.usuario.respuestaSecreta) ||
          !this.validarCampo('contraseña', this.usuario.password)) {
        return false;
      }
  
      return true;
    }
  
    ingresar() {
      this.router.navigate(['/ingreso']);
    }





      ////// ANIMACION TITULO  /////////
  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(8000)
        .fromTo('transform', 'translate(-100%)', 'translate(100%)')
        .fromTo('opacity', 1, 1);

      animation.play();
    }
  }
  }