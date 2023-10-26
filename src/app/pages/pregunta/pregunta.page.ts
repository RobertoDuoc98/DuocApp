import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  password: string = '';
  correo: string = '';
  preguntaSecreta: string = '';
  respuestaUsuario: string = '';
  usuario: string = '';


  constructor(private router: Router, private dbService: DataBaseService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async verificarRespuesta() {
    const usuario = await this.dbService.leerUsuario(this.correo);
    if (usuario && usuario.preguntaSecreta === this.preguntaSecreta && usuario.respuestaSecreta === this.respuestaUsuario) {
      this.router.navigate(['/correcto']);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  ingresar() {
    this.router.navigate(['/ingreso']);
  }
}