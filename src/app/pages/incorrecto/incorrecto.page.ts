import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IncorrectoPage implements OnInit {

  correo: string = '';
  password: string = '';
  
  constructor(private router: Router, private dbService: DataBaseService, private authService: AuthService) { }

  ngOnInit() {
  }

  ingresar() {
    this.router.navigate(['/ingreso']);
  }

}
