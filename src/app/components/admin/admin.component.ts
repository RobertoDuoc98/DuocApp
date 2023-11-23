import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminComponent  implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private bd: DataBaseService,
    private authService: AuthService) {}

  ngOnInit() {
    this.leerUsuarios();
  }
  async leerUsuarios() {
    try {
      // Lee todos los usuarios
      const todosLosUsuarios = await this.bd.leerUsuarios();
      const usuarioAdmin = todosLosUsuarios.find(usuario => usuario.correo === 'admin@duocuc.cl');
      if (usuarioAdmin) {
        this.usuarios = [usuarioAdmin, ...todosLosUsuarios.filter(usuario => usuario.correo !== 'admin@duocuc.cl')];
      } else {
        this.usuarios = todosLosUsuarios;
      }
    } catch (error) {
      showToast('Error al leer usuarios');
    }
  }

  // Función para eliminar un usuario
  async eliminarUsuario(usuario: Usuario) {
    try {
      // No elimina al usuario admin
      if (usuario.correo !== 'admin@duocuc.cl') {
        await this.bd.eliminarUsuarioUsandoCorreo(usuario.correo);
        showToast('Usuario eliminado correctamente');
        this.leerUsuarios();
      }
    } catch (error) {
      showToast('Error al eliminar usuario');
    }
  }
}