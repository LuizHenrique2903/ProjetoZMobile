import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Carteirinhas } from './models/carteirinhas.model';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: Carteirinhas[] = [];
  //produto: Produto = new Produto(null, null);
  user: Carteirinhas = new Carteirinhas('');
  indiceEdicao = -1;
  indiceExclusao = -1;
  modalExclusao: BsModalRef;

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    public usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {

  }

  salvar() {
    //Validação
    if (!this.user.nome) {
      console.log('Por favor informe o nome');
      this.toast.error('Por favor informe o nome');
      return;
    }

    if (!this.user.email) {
      console.log('Por favor informe o Email');
      this.toast.error('Por favor informe o Email');
      return;
    }
    if (!this.user.senha) {
      console.log('Por favor informe o Senha');
      this.toast.error('Por favor informe o Senha');
      return;
    }




    //Salva
    if (this.indiceEdicao == -1) {
      this.users.unshift(this.user);
    } else {
      this.users[this.indiceEdicao] = this.user;
    }

    //Limpa o formulário
    this.user = new Carteirinhas();
    this.indiceEdicao = -1;
    this.toast.success('Salvo com sucesso');
  }

  excluir(indice: number) {
    console.log(indice);
    this.users.splice(indice, 1);
    this.toast.warning('Excluido');
  }

  editar(indice: number) {
    this.indiceEdicao = indice;

    this.user = Object.assign(
      new Carteirinhas(), this.users[indice]
    );
  }

  abrirModalExc(template: TemplateRef<any>, indice: number) {
    this.indiceExclusao = indice;
    this.modalExclusao = this.modalService.show(template);
  }

  fecharModalExc(excluir: boolean) {
    this.modalExclusao.hide();

    if (excluir) {
      this.excluir(this.indiceExclusao);
    }
  }
}
