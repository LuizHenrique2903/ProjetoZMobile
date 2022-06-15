import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaDeUsuariosComponent } from './lista-de-usuarios/lista-de-usuarios.component';
import { BrowserAnimationsModule }from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { FormularioCarteirinhaComponent } from './formulario-carteirinhas/formulario-carteirinhas.component';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  declarations: [
    AppComponent,
    ListaDeUsuariosComponent,
    HomeComponent,
    FormularioCarteirinhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
