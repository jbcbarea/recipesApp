import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoringRecipesService {

  private API_URL = 'http://localhost:3000'; // Update this to your actual API URL

  constructor(private http: HttpClient) { }

  public getRecipeScoreById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/scoringRecipes/${id}`);
  }

  public getRecipeScoreByUser(recipeId: number, userEmail: string): Observable<any> {
    const params = new HttpParams().set('recipeId', recipeId.toString()).set('userEmail', userEmail);
    return this.http.get<any[]>(`${this.API_URL}/scoringRecipes/getRecipeScoreByUser`, {params: {recipeId,userEmail}});
  }

  public addRecipeScore(recipeId: number, userEmail: string, recipeScoring: number): Observable<any> {
    const params = new HttpParams().set('recipeId', recipeId.toString()).set('userEmail', userEmail).set('recipeScoring',recipeScoring.toString());
    return this.http.post(`${this.API_URL}/scoringRecipes/createRecipeScoring`,{}, {params });
  }

  public deleteRecipeScore(recipeId: number, userEmail: string): Observable<any> {
    const params = new HttpParams().set('recipeId', recipeId.toString()).set('userEmail', userEmail);
    return this.http.delete(`${this.API_URL}/scoringRecipes/deleteRecipeScoring`, { params});
  }

  public updateRecipeScore(recipeId: string, userEmail: string, newRecipeScoring: number): Observable<any> {
    const params = new HttpParams().set('recipeId', recipeId.toString()).set('userEmail', userEmail).set('newRecipeScoring',newRecipeScoring);
    return this.http.post(`${this.API_URL}/scoringRecipes/updateRecipeScoring`, {params});
  }
}