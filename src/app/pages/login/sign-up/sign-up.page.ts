import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthUsersService } from 'src/app/services/auth-users.service';

enum UserCredentials {
  notGranted = 'El email ya está registrado',
  isGranted = 'Usuario creado correctamente'
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  isLoading:boolean = false;
  credentialsGranted:boolean = true;
  constructor(private readonly authUsersService:AuthUsersService,private readonly toastController:ToastController,private readonly router:Router) { }

  ngOnInit() {
  }

  public onSubmit(form:NgForm): void {

    console.log(form)
    if (form.valid) {
      
      //TODO: Para probar en mv que todo funciona sin que se logee a través de base de datos
      this.authUsersService.register(form.value.name, form.value.email,form.value.phone,form.value.password)
        .toPromise()
        .then((response) => {
          console.log(response);
          if (response.res === UserCredentials.notGranted) {
            this.credentialsGranted = false;
            setTimeout(() =>{
             this.credentialsGranted = true;
            },3000);
            //this.presentErrorToast();
            //form.reset();
          }else {
            this.presentSuccessToast();
            setTimeout(() =>{
              this.router.navigate(['/login']);
            },3000);
          }
        })
        .catch((error) => {
          console.error('Error en el inicio de sesión:', error);
         this.presentErrorToast();
        })
        .finally(() => {
        });  
    }

  }
  private async presentSuccessToast():Promise<void> {
    const toast = await this.toastController.create({
      message: 'Usuario creado correctamente',
      duration: 3000, 
      position: 'bottom' 
    });
    toast.present();
  }
  
  private async presentErrorToast():Promise<void> {
    const toast = await this.toastController.create({
      message: 'Erros al crear al usuario, Póngase en contacto con el administrador',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
