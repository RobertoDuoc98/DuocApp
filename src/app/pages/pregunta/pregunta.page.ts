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
  usuarioValidado: Usuario | null = null;

  constructor(private router: Router, private dbService: DataBaseService, private authService: AuthService) { }

  ngOnInit(): void {
    // Obtén la pregunta secreta y el nombre de usuario del servicio AuthService
  this.preguntaSecreta = this.authService.getPreguntaSecreta();
  this.nombreUsuario = this.authService.getNombreUsuario();
  }

  async verificarRespuesta() {
    const usuario = await this.dbService.leerUsuario(this.correo);
    if (usuario && usuario.respuestaSecreta === this.respuestaSecreta) {
      this.authService.setContraseñaUsuario(usuario.password);
      this.router.navigate(['/correcto']); // Respuesta secreta válida, redirige a "correcto"
    } else {
      this.router.navigate(['/incorrecto']); // Respuesta secreta incorrecta, redirige a "incorrecto"
    }
  }

  ingresar() {
    this.router.navigate(['/ingreso']);
  }
}