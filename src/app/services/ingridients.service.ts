import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngridientsService {
  private API_URL = 'http://localhost:3000';
  //private API_URL = 'http://192.168.1.135:3000';

  constructor(private http: HttpClient) {}

  public getIngridients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/ingredients`);
  }
  public getIngridientsByName(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/ingredients/ingredientName`);
  }

  public addNewIngredient(params: any): Observable<any[]> {
    return this.http.post<any[]>( `${this.API_URL}/ingredients/addNewIngredient`,params );
  }
}
