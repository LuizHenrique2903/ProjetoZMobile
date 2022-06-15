import { Usuario } from 'src/app/models/usuario.model';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Carteirinhas } from '../models/carteirinhas.model';
import { CarteirinhaService } from '../services/carteirinha.service';

@Component({
  selector: 'app-lista-de-produtos',
  templateUrl: './lista-de-usuarios.component.html',
  styleUrls: ['./lista-de-usuarios.component.scss']
})
export class ListaDeUsuariosComponent implements OnInit {

  /*@Input() lista: Produto[];
  @Output() edita = new EventEmitter();
  @Output() exclui = new EventEmitter();*/

  usuarios: any[];
  indiceExclusao = -1;
  modalExclusao: BsModalRef;
  dados: any;

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    private servico: CarteirinhaService
  ) {
  }

  ngOnInit(): void {
    this.servico.getUsuarios().subscribe((data)=>{
      this.usuarios= data;

    })
    console.log(this.usuarios);


  }

  excluir(indice: number) {
    console.log(indice);
    this.servico.excluir(indice);
    this.toast.warning('Excluido');
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
