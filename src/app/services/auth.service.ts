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

  private preguntaSecreta: string = '';
  private nombreUsuario: string = '';
  private contraseñaUsuario: string = '';

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
    await this.storage.get(this.keyUsuario).then( async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.primerInicioSesion.next(false);
        this.router.navigate(['inicio']);
      } else {
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido ${usuario.nombre} ${usuario.apellido}!`);
            this.guardarUsuarioAutenticado(usuario);
            this.primerInicioSesion.next(true);
            this.router.navigate(['inicio']);
          } else {
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        })
      }
    })
  }

  // Método para almacenar la pregunta secreta y el nombre del usuario
  setPreguntaSecreta(preguntaSecreta: string) {
    this.preguntaSecreta = preguntaSecreta;
  }
  setNombreUsuario(nombreUsuario: string) {
    this.nombreUsuario = nombreUsuario;
  }

  // Métodos para obtener la pregunta secreta y el nombre del usuario
  getPreguntaSecreta() {
    return this.preguntaSecreta;
  }
  getNombreUsuario() {
    return this.nombreUsuario;
  }
 //Metodo para obtener la contraseña del usuario
 setContraseñaUsuario(contraseña: string) {
  this.contraseñaUsuario = contraseña;
}

getContraseñaUsuario(): string {
  return this.contraseñaUsuario;
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
