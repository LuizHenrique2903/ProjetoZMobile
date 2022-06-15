import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carteirinhas as Carteirinhas } from '../models/carteirinhas.model';
import { CarteirinhaService } from '../services/carteirinha.service';

@Component({
  selector: 'app-formulario-produto',
  templateUrl: './formulario-carteirinhas.component.html',
  styleUrls: ['./formulario-carteirinhas.component.scss']
})
export class FormularioCarteirinhaComponent implements OnInit {

  carteirinha: Carteirinhas = new Carteirinhas('');
  indiceEdicao = -1;
  frente: File;
  verso: File;

  constructor(
    private toast: ToastrService,
    private servico: CarteirinhaService,
    private router: Router,
    private rota: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    //console.log(this.rota.params);
    this.rota.params.subscribe(parametros => {
      console.log(parametros);
      if (parametros.indice) {
        //Edição
        this.indiceEdicao = parametros.indice;
        this.carteirinha = this.servico.getProdutoByIndex(this.indiceEdicao);
      } else {
        //Inclusão
      }
    });
  }
  enviarFrente(event:any){
    const target = event.target as HTMLInputElement;
    this.frente = (target.files as FileList)[0];

  }
  enviarVerso(event:any){
    const target = event.target as HTMLInputElement;
    this.verso = (target.files as FileList)[0];
  }

  salvar() {
    //Validação


    if (!this.carteirinha.nome) {
      this.toast.error('Por favor informe o nome');
      return;
    }
    if (!this.carteirinha.email) {
      this.toast.error('Por favor informe o email');
      return;
    }
    if (!this.carteirinha.senha) {
      this.toast.error('Por favor informe o senha');
      return;
    }


    //Salva

    if (this.indiceEdicao == -1) {
      console.log(this.frente)
      this.servico.adicionar(this.carteirinha,this.frente,this.verso);
    } else {
      this.servico.editar(this.indiceEdicao, this.carteirinha);
    }

    //Limpa o formulário
    this.carteirinha = new Carteirinhas();
    //this.indiceEdicao = -1;
    this.toast.success('Salvo com sucesso');
    this.router.navigate(['usuarios']);
  }

}
