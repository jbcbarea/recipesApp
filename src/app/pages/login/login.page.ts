import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUsersService } from 'src/app/services/auth-users.service';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import {Storage} from '@capacitor/storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signInForm: FormGroup;
  credentials = false;
  validLogin:boolean = false;

  constructor(
    private readonly authUsersService: AuthUsersService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.isMobile();
    this.signInForm.valueChanges.subscribe(()=>{
      this.credentials = false;
    });
    window.onpopstate = () => {
      window.history.pushState(null, null, 'http://google.es/');
    };
  }

  public closingApp(): void {
      history.pushState(null, null, document.URL);
      window.location.href = 'http://riberadeltajo.es/nuevaweb/';
      if(this.isMobile) {
        App.exitApp();
        //navigator['app'].exitApp();
      } 
  }

  private createForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  public async isMobile(): Promise<boolean>{

    const infoDevice= Device.getInfo();
    console.log((await infoDevice).platform);

    if((await infoDevice).platform !== 'web') {
      return true;
    }else {
      return false;
    }
    //console.log(App.getInfo());
  }

  public async onSubmit(): Promise<void> {

    if (this.signInForm.valid) {
      
      //TODO: Para probar en mv que todo funciona sin que se logee a través de base de datos
      this.authUsersService.login(this.signInForm.value.email, this.signInForm.value.password)
        .toPromise()
        .then(async (response) => {
          console.log(response,'A ver que esta mandando de respuesta!!');
          if (response && response.response !== 'Credenciales inválidas') {
            console.log(response);
            console.log(response.response);
            const token = response.response;
            localStorage.setItem('token', token);
            const decodedToken = this.getDecodedToken(token);
            console.log('decodedToken',decodedToken);
            if (decodedToken) {
              if (decodedToken.rol === 'admin') {
                this.router.navigate(['/login']);
              } else {
              
                if(this.isMobile) {
                  await Storage.set({
                    key: 'userEmail',
                    value: decodedToken.email
                  });
                }
  
                localStorage.setItem('userEmail', decodedToken.email);
                localStorage.setItem('userEmailTime', new Date().toString());
                this.setUserEmailExpiration();
                this.router.navigate(['/tabs']);
              }
            } else {
              this.credentials = false;
            }
          } else {
            console.log('Vale me Hace el return de las credenciales inválidas')
            console.error('Credenciales inválidas.');
            this.credentials = true;
          }
          this.validLogin = true;
        })
        .catch((error) => {
          console.error('Error en el inicio de sesión:', error);
          this.credentials = true;
          this.validLogin = false;
        })
        .finally(() => {
        });
        
        //this.router.navigate(['/tabs']);
    }
  }
  
  private setUserEmailExpiration(): void {
    const userEmail = localStorage.getItem('userEmail');
    const userEmailTime = localStorage.getItem('userEmailTime');

    if (userEmail && userEmailTime) {
      const userEmailExpirationTime =
        new Date(userEmailTime).getTime() + 60 * 60 * 1000; // 1 hora
      const currentTime = new Date().getTime();

      if (currentTime > userEmailExpirationTime) {
        // El correo ha expirado, eliminarlo del localStorage
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userEmailTime');
      }
  }
}

private getDecodedToken(token: string): any {
    try {
      const [, payloadBase64] = token.split('.');
      const payload = JSON.parse(atob(payloadBase64));
      return payload;
    } catch (error) {
      console.error('Error decoding the token:', error);
      return null;
    }
  }
}
