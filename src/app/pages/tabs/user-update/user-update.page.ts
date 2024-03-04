import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthUsersService } from 'src/app/services/auth-users.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {
  updateForm: FormGroup;
  resetPassword: boolean = false;
  repeatedPassword: boolean = false;
  userEmail: string;
  constructor(
    private readonly updateUserAccount: AuthUsersService,
    private readonly toastController: ToastController
  ) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail');
    this.createForm();
  }

  public isChecked(event): void {
    const oldPassword = this.updateForm.get('oldPassword');
    const password = this.updateForm.get('password');
    const passwordRepeat = this.updateForm.get('passwordRepeat');

    if (event.detail.checked) {
      this.resetPassword = true;
      oldPassword.setValidators([Validators.required, Validators.minLength(8)]);
      password.setValidators([Validators.required, Validators.minLength(8)]);
      passwordRepeat.setValidators([
        Validators.required,
        Validators.minLength(8),
      ]);
    } else {
      this.resetPassword = false;
      oldPassword.clearValidators();
      password.clearValidators();
      passwordRepeat.clearValidators();
    }

    oldPassword.updateValueAndValidity();
    password.updateValueAndValidity();
    passwordRepeat.updateValueAndValidity();
  }

  public onSubmit(): void {
    const oldPassword = this.updateForm.get('oldPassword');
    const password = this.updateForm.get('password');
    const passwordRepeat = this.updateForm.get('passwordRepeat');
    const name = this.updateForm.get('name');
    const phone = this.updateForm.get('phone');

    if (this.resetPassword) {
      if (this.updateForm.valid) {
        if (password.value === passwordRepeat.value) {
          this.updateUserAccount
            .updateUserCredentials(
              this.userEmail,
              oldPassword.value,
              password.value,
              name.value,
              phone.value
            )
            .subscribe((response: any) => {
              if (response) {
                //Poner un Toast mirar
                if (response.success === true) {
                  this.presentSuccessToast();
                  this.updateForm.reset();
                } else {
                  this.presentErrorToastOldPassword();
                  this.updateForm.reset();
                }
              } else {
                this.presentErrorToast();
              }
            });
        } else {
          this.repeatedPassword = true;
          setTimeout(() => {
            this.repeatedPassword = false;
          }, 3000);
        }
      }
    } else {
      if (this.updateForm.valid) {
        this.updateUserAccount
          .updateUserCredentialsNamePhone(
            this.userEmail,
            name.value,
            phone.value
          )
          .subscribe((response) => {
            if (response) {
              //Poner un Toast mirar
              this.presentSuccessToast();
              this.updateForm.reset();
            } else {
              this.presentErrorToast();
            }
          });
      } else {
        this.repeatedPassword = true;
        setTimeout(() => {
          this.repeatedPassword = false;
        }, 3000);
      }
    }
  }

  private async presentSuccessToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Credenciales actualizadas correctamente',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
  private async presentErrorToastOldPassword(): Promise<void> {
    const toast = await this.toastController.create({
      message:
        'Error al actualizar las credenciales, la antigua contraseña introducida no es correcta',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
  private async presentErrorToast(): Promise<void> {
    const toast = await this.toastController.create({
      message:
        'Error al actualizar las credenciales, Póngase en contacto con el administrador',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
  //TODO: Todos los controles para que hagan validaciones y de todo vale?
  private createForm(): void {
    this.updateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      oldPassword: new FormControl(),
      password: new FormControl(),
      passwordRepeat: new FormControl(),
    });
  }
}
