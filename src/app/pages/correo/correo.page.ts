import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {
  
  correo = '';
  

  constructor(private router: Router,
     private bd: DataBaseService, 
     private authService: AuthService) { }

     ngOnInit() {
    }
  
  async verificarCorreo(correo: string) {
    await this.bd.validarCorreo(correo).then(async (usuario : Usuario | undefined) => {
      if (usuario){
        this.router.navigate(['/pregunta'], {queryParams : {pregunta: usuario.preguntaSecreta}});
        console.log(usuario)
      } else {
        this.router.navigate(['/incorrecto']);
      }
    });
  }

  ingresar() {
    this.router.navigate(['/ingreso']);
  }
}