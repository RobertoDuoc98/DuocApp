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

  constructor(private router: Router, private dbService: DataBaseService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  async verificarCorreo() {
    const usuario = await this.dbService.leerUsuario(this.correo);
    if (usuario) {
      this.router.navigate(['/pregunta']);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }
  ingresar() {
    this.router.navigate(['/ingreso']);
  }
  
}