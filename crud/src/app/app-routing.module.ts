import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaDeUsuariosComponent } from './lista-de-usuarios/lista-de-usuarios.component';
import { FormularioCarteirinhaComponent } from './formulario-carteirinhas/formulario-carteirinhas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: ListaDeUsuariosComponent },
  { path: 'carteirinha/novo', component: FormularioCarteirinhaComponent },
  { path: 'carteirinhas/:indice', component: FormularioCarteirinhaComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
