import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  dados: Usuario[] = [];
  private _usuarioLogado: Usuario;

  constructor(
    private router: Router
  ) {
    this.dados.push(new Usuario('admin', 'admin'));
    this.dados.push(new Usuario('teste', 'teste'));
  }

  logout() {
    this._usuarioLogado = null;
    this.router.navigate(['/auth/login']);
  }

  login(usuario: Usuario) {
    this._usuarioLogado = this.dados.find(u => {
      return usuario.login == u.login
      && usuario.senha == u.senha;
    });
    return this._usuarioLogado;
  }

  get usuarioLogado() {
    return this._usuarioLogado;
  }
}
