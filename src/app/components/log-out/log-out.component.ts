import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent implements OnInit {
  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  //TODO: en el html o aqui meterle un input que reciba de cada tab el mail para que aparezcaa en un ladito y que al cerrar
  //modal que adios amigui usuario
  //TODO: Que saque un modal si quiere salir del sistema o no el usuario!!!!


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }
  logout() {
    // Eliminar la información de la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userEmailTime');
    this.router.navigate(['/login'], { replaceUrl: true });
    window.onpopstate = function(event) {
      history.pushState(null, null, document.URL);
      // Redirigir a una página específica
      window.location.href = '/login';
    };
  }
}
