import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateRecipeService {

  private API_URL = 'http://localhost:3000';
  // private API_URL = 'http://192.168.1.135:3000';
   constructor(private http: HttpClient) { }

   public createRecipe(params: any): Observable<any[]> {
    // Realizar la solicitud POST a la API con los parámetros
    return this.http.post<any[]>(`${this.API_URL}/recipes/createRecipe`, params);
  }
}
