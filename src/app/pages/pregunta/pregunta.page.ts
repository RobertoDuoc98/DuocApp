import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import {Usuario} from 'src/app/model/usuario';
import { SqliteService } from 'src/app/services/sqlite.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private bd: DataBaseService,
    private activatedRoute: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.activatedRoute.queryParams.subscribe(params => {
      this.preguntaSecreta = params['pregunta'];
    });
  }

  ngOnInit() {
    // Obtener el nombre y apellido del usuario del AuthService
    const datosUsuario = this.authService.getDatosUsuario();
    this.nombreUsuario = `${datosUsuario.nombre} ${datosUsuario.apellido}`;

    this.authService.usuarioAutenticado.subscribe((usuario) => {
      this.usuario = usuario ? usuario : new Usuario();
      console.log('Usuario actual:', this.usuario);
    });
  }
  
 public preguntaSecreta = '';
 usuario = new Usuario();
 respuestaSecreta = ''; 
 nombreUsuario: string = '';

  async verificarRespuesta(respuestaSecreta: string) {
    // Validar que el campo de respuesta no esté en blanco
    if (!this.respuestaSecreta.trim()) {
      showToast('El campo de respuesta no puede estar en blanco');
      return;
    }
    
    
    await this.bd.validarRespuesta(respuestaSecreta).then(async (usuario : Usuario | undefined) => {
      if (usuario){
        this.router.navigate(['/correcto'], {queryParams : {password: usuario.password}});
        console.log(usuario);
      } else {
        this.router.navigate(['/incorrecto']);
      }
    });
  }


  ingresar() {
    this.router.navigate(['/ingreso']);
  }
}