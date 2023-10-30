import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {
  
  correo: string = '';
  password: string = '';
  usuarioValidado: any;

  preguntaSecreta: string = '';
  nombreUsuario: string = '';

  constructor(private router: Router, private bd: DataBaseService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  async verificarCorreo() {
    this.usuarioValidado = await this.bd.leerUsuario(this.correo);
    if (this.usuarioValidado) {
      console.log('Usuario válido:', this.usuarioValidado);
      // Asignar nombre, apellido y pregunta secreta antes de navegar
      this.authService.setPreguntaSecreta(this.usuarioValidado.preguntaSecreta);
      this.authService.setNombreUsuario(`${this.usuarioValidado.nombre} ${this.usuarioValidado.apellido}`);
      
      console.log('Pregunta secreta asignada:', this.authService.getPreguntaSecreta());
      console.log('Nombre de usuario asignado:', this.authService.getNombreUsuario());
      this.router.navigate(['/pregunta']);
    } else {
      console.log('Usuario no válido');
      this.router.navigate(['/incorrecto']);
    }
  }

  ingresar() {
    this.router.navigate(['/ingreso']);
  }
}