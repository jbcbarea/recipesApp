import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,private navCtrl: NavController) {
   // this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.navCtrl.navigateRoot('/splash');
    });
  }
}
