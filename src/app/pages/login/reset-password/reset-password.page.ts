import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthUsersService } from 'src/app/services/auth-users.service';

enum ServerResponse {
  userNotFound = 'Usuario no encontrado'
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  form:FormGroup;
  userNotFound:boolean = false;
  constructor(private readonly authUsersService:AuthUsersService,private readonly toastController:ToastController,private readonly router:Router) { }

  //TODO: Servicio de Toast o llamar a lo del Toast!! vale?.
  
  ngOnInit() {
    this.createForm();
  }

  public onSubmit():void {

    this.authUsersService.resetPassword(this.form.controls['email'].value)
    .subscribe(
      (response) => {
        console.log('EOOOOOOOOO',response); 
        if(response.response === ServerResponse.userNotFound) {
          this.userNotFound = true;
          setTimeout(() =>{
            this.userNotFound = false;
          },4000);
        }else {
          this.presentSuccessToast();
          //this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error(error);
      this.presentErrorToast();
      }
    );
}

  private createForm():void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  private async presentSuccessToast():Promise<void> {
    const toast = await this.toastController.create({
      message: 'Email enviado correctamente, sigue las instrucciones del email para resetear la contraseña',
      duration: 3000, 
      position: 'bottom' 
    });
    toast.present();
  }
  
  private async presentErrorToast():Promise<void> {
    const toast = await this.toastController.create({
      message: 'Error al enviar el email, Póngase en contacto con el administrador',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
