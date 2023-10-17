import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { QrComponent } from 'src/app/components/qr/qr.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QrComponent,
    MiclaseComponent,
    ForoComponent,
    MisdatosComponent
  ]
})
export class InicioPage implements OnInit {
  componente_actual = 'qr';

  constructor() { }

  ngOnInit() {
  }
  cambiarComponente(event: any){
    this.componente_actual = event.detail.value;
  }
}
