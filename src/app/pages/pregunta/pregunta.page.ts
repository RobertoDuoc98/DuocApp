import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private authService: AuthService,
    private router: Router, 
    private bd: DataBaseService, 
    private activatedRoute: ActivatedRoute) {
     const navigation = this.router.getCurrentNavigation();
     this.activatedRoute.queryParams.subscribe(params => {
     this.preguntaSecreta =params['pregunta'];
     
     });
   }

 ngOnInit() {
 }
 public preguntaSecreta = '';
 usuario = new Usuario();
 respuestaSecreta = ''; 

  async verificarRespuesta(respuestaSecreta: string) {
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