import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private readonly router: Router) {}
 
  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('token');
    console.log(isLoggedIn);
    if (isLoggedIn !== null && isLoggedIn !== 'Credenciales inválidas') {
      this.router.navigate(['/tabs']); // Redirige a la página de pestañas si el usuario ya ha iniciado sesión
      return false; // Evita acceder a la página de inicio de sesión
    }
    // 
     return true;

  }
}