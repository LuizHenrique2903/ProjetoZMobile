import { AngularFireDatabase} from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map,finalize} from 'rxjs/operators';

export class Data{
  nome?: string;
  cpf?: string;
  email?: string;
  frenteURL: string;
  versoURL: string;

}
@Injectable({
  providedIn: 'root'
})
export class CarteirinhaService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  GetCarterinha() {
    return this.db.list('carteirinhas').snapshotChanges().pipe(
      map((action)=> {
        return action.map((dados)=>( {
          key:dados.payload.key,
          data:dados.payload.val()
        }))
      })
    );
  }

  Uploaddatabase(carteirinha: Data) {
    return this.db.database.ref('carteirinhas').push(carteirinha)
    .then((resp)=>{console.log(resp)})
    .catch((error)=>{console.log(error)})

  }


}
