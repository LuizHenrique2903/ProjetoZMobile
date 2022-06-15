import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    private servico: UsuarioService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    let u = this.servico.login(this.usuario);

    if (u) {
      this.router.navigate(['/home']);
    } else {
      this.toast.error('Usuário ou senha incorreta');
    }
  }

}
