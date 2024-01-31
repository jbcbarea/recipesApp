import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUsersService {
  //http://192.168.1.135:3000
  private API_URL = 'http://localhost:3000'; // Cambiar a la URL de tu API
  //private API_URL = 'http://192.168.1.135:3000';
  constructor(private http: HttpClient) { }

 public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/users/login`, { email, password });
  }
  public register(name: string, email: string, phone: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/users/register`, { name, email, phone, password });
  }
  public registerAdmin(name: string, email: string, phone: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/users/registerAdmin`, { name, email, phone, password });
  }
  public resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/users/request-password-reset`, { email });
  }
  public updateUserCredentials( email: string,  oldPassword: string, newPassword:string, name:string,phone:number): Observable<any> {
    return this.http.post(`${this.API_URL}/users/updateUserCredentials`, {  email,oldPassword,newPassword,name,phone });
  }
  public updateUserCredentialsNamePhone( email: string, name:string,phone:string): Observable<any> {
    return this.http.post(`${this.API_URL}/users/updateUserCredentialsNamePhone`, {  email,name,phone });
  }
}
