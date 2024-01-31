import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteRecipesService {
  private API_URL = 'http://localhost:3000';
  //private API_URL = 'http://192.168.1.135:3000';

  constructor(private http: HttpClient) { }

  public getFavouriteRecipe(userEmail:string):Observable<any[]> {
    const params = new HttpParams().set('userEmail', userEmail);
    return this.http.get<any[]>(`${this.API_URL}/favouriteRecipes`,{params});
  }

  public checkFavouriteRecipe(userMail:string,userId:number):Observable<any[]> {
    const params = new HttpParams().set('userEmail', userMail).set('recipeId', userId.toString());
    return this.http.get<any[]>(`${this.API_URL}/favouriteRecipes/checkFavouriteRecipe`,{params});
  }
  public addFavouriteRecipe(userMail: string, userId: number): Observable<any[]> {
    const params = new HttpParams().set('userEmail', userMail).set('recipeId', userId.toString());
    return this.http.post<any[]>(`${this.API_URL}/favouriteRecipes/addFavouriteRecipe`, {}, { params });
  }

 public deleteFavourite(userEmail: string, recipeId: number): Observable<any[]> {
  const params = new HttpParams().set('userEmail', userEmail).set('recipeId', recipeId.toString());
  return this.http.delete<any[]>(`${this.API_URL}/favouriteRecipes/deleteFavouriteRecipe`, { params });
}



  /*
o match the parameter names expected by the server.
I added an empty object {} as the second parameter to the post method, as the body is not needed for this request.
  */

}
