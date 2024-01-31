
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterConfigOptions } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: 'splash.page.html',
  styleUrls: ['splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private router: Router) {}
  fadeOut= false;

  ngOnInit(): void {
    this.ionViewDidEnter();
  }

  ionViewDidEnter() {
    setTimeout(() =>{
      this.fadeOut = true;
    },3000);
    setTimeout(() => {
      //Navegar mejor a la página de Login y eso....
      this.router.navigateByUrl('/login'); // Utiliza el enrutado
    }, 4000);
}
}