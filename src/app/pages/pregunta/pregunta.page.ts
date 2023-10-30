import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import {Usuario} from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  correo: string = 'atorres@duocuc.cl';
  respuestaSecreta: string = '';
  preguntaSecreta: string = '';
  nombreUsuario: string = '';


  constructor(private router: Router, private bd: DataBaseService, private authService: AuthService) { }

  ngOnInit(): void {
    // Obtén la pregunta secreta y el nombre de usuario del servicio AuthService
  this.preguntaSecreta = this.authService.getPreguntaSecreta();
  this.nombreUsuario = this.authService.getNombreUsuario();
  }

  async verificarRespuesta() {

    console.log('Respuesta secreta ingresada:', this.respuestaSecreta);

    const usuario = await this.bd.leerUsuario(this.correo);

    if (usuario) {
      console.log('Respuesta secreta almacenada en la base de datos:', usuario.respuestaSecreta);
    
      if (usuario.respuestaSecreta === this.respuestaSecreta) {
        console.log('La respuesta secreta es válida.');
        this.authService.setContraseñaUsuario(usuario.password);
        this.router.navigate(['/correcto']); // Respuesta secreta válida, redirige a "correcto"
      } else {
        console.log('La respuesta secreta es incorrecta.');
        this.router.navigate(['/incorrecto']); // Respuesta secreta incorrecta, redirige a "incorrecto"
      }
    } else {
      console.log('Usuario no encontrado en la base de datos.');
      this.router.navigate(['/incorrecto']); // Usuario no encontrado, redirige a "incorrecto"
    }
  }
  

  ingresar() {
    this.router.navigate(['/ingreso']);
  }
}