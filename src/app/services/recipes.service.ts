import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private API_URL = 'http://localhost:3000';
  // private API_URL = 'http://192.168.1.135:3000';
  constructor(private http: HttpClient) {}

  public getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/recipes`);
  }
  public getRecipesById(recipeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/recipes/${recipeId}`);
  }
  public getFilteredRecipes(params: any): Observable<any[]> {
    // const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<any[]>(`${this.API_URL}/recipes/filter`, { params });
  }

  public getRecipesByWorldType(worldTypeRecipe: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API_URL}/recipes/recipesWorld/${worldTypeRecipe}`
    );
  }
  public getRecipeImageByIdBase64(recipeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/recipes/${recipeId}/image`);
  }
}
