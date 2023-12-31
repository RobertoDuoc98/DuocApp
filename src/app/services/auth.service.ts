import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { DataBaseService } from './data-base.service';
import { Storage } from '@ionic/storage-angular';
import { showToast } from '../tools/message-routines';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);
  primerInicioSesion = new BehaviorSubject<boolean>(false);

  private nombreUsuario: string = '';
  private apellidoUsuario: string = '';
 

  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) { 
    this.inicializarAutenticacion();
  }

  async inicializarAutenticacion() {
    await this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario) as Usuario;
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  guardarUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }

  eliminarUsuarioAutenticado(usuario: Usuario) {
    this.storage.remove(this.keyUsuario);
  }

 
  async login(correo: string, password: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.primerInicioSesion.next(false);
  
        // Verificar el rol del usuario autenticado
        if (usuarioAutenticado.rol === 'admin') {
          // Mostrar todos los usuarios solo si el usuario autenticado es el administrador
          this.bd.leerUsuarios().then(usuarios => {
            console.log('Todos los usuarios:', usuarios);
          });
        }
  
        this.router.navigate(['inicio']);
      } else {
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido ${usuario.nombre} ${usuario.apellido}!`);
  
            // Actualizar el rol del usuario después de autenticar
            if (usuario.correo === 'admin@duocuc.cl') {
              usuario.rol = 'admin';
            } else {
              usuario.rol = 'estudiante';
            }
  
            this.guardarUsuarioAutenticado(usuario);
            this.primerInicioSesion.next(true);
            this.router.navigate(['inicio']);
          } else {
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        });
      }
    });
  }


  // Método para establecer el nombre y apellido del usuario
  setDatosUsuario(nombre: string, apellido: string) {
    this.nombreUsuario = nombre;
    this.apellidoUsuario = apellido;
  }

  // Método para obtener el nombre y apellido del usuario
  getDatosUsuario(): { nombre: string, apellido: string } {
    return { nombre: this.nombreUsuario, apellido: this.apellidoUsuario };
  }

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.eliminarUsuarioAutenticado(usuario);
      }
      this.router.navigate(['ingreso']);
    });
  }

}
