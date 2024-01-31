import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  //TODO: en el html o aqui meterle un input que reciba de cada tab el mail para que aparezcaa en un ladito y que al cerrar
  //modal que adios amigui usuario
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
