import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading:any;
  public formLogin: FormGroup;

  constructor(
  private loadingCtrl: LoadingController,
  private toastCtrl: ToastController,
  private authService: AuthService,
  private formBuilder: FormBuilder,
  private router:Router



  )  { }

  ngOnInit() {
    this.formLogin=this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.minLength(6)]]
    });
  }

  login(){

    this.authService.login(this.formLogin.controls['email'].value,this.formLogin.controls['password'].value)
    .then(()=>{
      this.presentLoading("Seja bem vindo!")
      this.router.navigate(["/home"])
    })
    .catch(()=>{
      this.presentLoading("Email Ou Senha incorreto!")
    })
  }

  submitForm() {
    this.validarForm();
    if(!this.formLogin.valid){return}
    this.login();
  }

  validarForm(){
    for(let campos in this.formLogin.controls){
      this.formLogin.controls[campos].markAsTouched();
    }
  }



  async presentLoading(mensagem:string) {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      duration:1000,
      message: mensagem,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    return this.loading.present();
  }


}

