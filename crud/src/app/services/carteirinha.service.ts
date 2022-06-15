import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Carteirinhas } from '../models/carteirinhas.model';
import { map,finalize} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CarteirinhaService {

  private dados: Carteirinhas[] = [];
  task?: AngularFireUploadTask;
  uploadedFileURL?: Observable <string>;
  nomeFrente: string;
  nomeVerso: string;
  constructor(
    private auth:AngularFireAuth,
    private storage:AngularFireStorage,
    private database:AngularFireDatabase

  )
  {

  }

  getUsuarios() {
    return this.database.list('carteirinhas').snapshotChanges().pipe(
      map((action)=>{
        return action.map((a)=>({
          key:a.payload.key,
          data:a.payload.val()
        }))
      })
    )
  }

  adicionar(dado: Carteirinhas,frente: File,verso: File) {
    console.log(frente.name)
    this.nomeFrente= frente.name;
    this.nomeVerso= verso.name;
    //frente
    const pasta = `carteirinha/${new Date().getTime()}_${frente.name}`
    const fileRef = this.storage.ref(pasta)
    this.task = this.storage.upload(pasta,frente)
    this.task.snapshotChanges().pipe(
      finalize(()=>{
        this.uploadedFileURL = fileRef.getDownloadURL();
        this.uploadedFileURL.subscribe(resp=>{
          dado.frenteURL=resp;
          const pasta2 = `carteirinha/${new Date().getTime()}_${this.nomeVerso}`
    const fileRef2 = this.storage.ref(pasta2)
    this.task = this.storage.upload(pasta2,verso)
    this.task.snapshotChanges().pipe(
      finalize(()=>{
        this.uploadedFileURL = fileRef2.getDownloadURL();
        this.uploadedFileURL.subscribe(resp=>{
          dado.versoURL=resp;
          this.auth.createUserWithEmailAndPassword(dado.email,dado.senha);
          this.database.database.ref("carteirinhas").push(dado);
        })
      })
    ).subscribe()
        })
      })
    ).subscribe()





  }

  excluir(indice: number) {
    this.dados.splice(indice, 1);
  }

  getProdutoByIndex(indice: number) {
    return this.dados[indice];
  }

  editar(indice: number, produto: Carteirinhas) {
    this.dados[indice] = produto;
  }
}
