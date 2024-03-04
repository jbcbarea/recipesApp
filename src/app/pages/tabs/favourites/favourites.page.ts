import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FavouriteRecipesService } from 'src/app/services/favourite-recipes.service';

interface Recipe {
  id: number;
  imagenreceta: string;
  name: string;
  tipo_receta: string;
  puntuacion: number;
  comensales: number;
  tiempo_preparacion: number;
  dificultad: string;
}

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  recipes: Recipe[] = [];
  recipesAll: Recipe[] = [];
  recipesFound: string = null;
  user: string;
  constructor(
    private readonly favRecipeService: FavouriteRecipesService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {}

  public async ionViewWillEnter(): Promise<void> {
    this.user = localStorage.getItem('userEmail');
    await this.getFavouritesRecipe(localStorage.getItem('userEmail'));
  }

  public navigateToFullRecipes(recipeId: number) {
    this.router.navigate(['/tabs/recipes', recipeId], {
      queryParams: {
        page: 'favourites',
      },
    });
  }

  private async getFavouritesRecipe(userMail: string): Promise<void> {
    this.favRecipeService
      .getFavouriteRecipe(userMail)
      .subscribe((data: any) => {
        this.recipes = data;
        this.recipesAll = data;
      });
  }
  public handleRecipesFound(recipesFound: string): void {
    if (recipesFound === '') {
      this.recipesFound = null;
    } else {
      this.recipesFound = recipesFound;
    }

    if (recipesFound) {
      this.recipesAll = this.recipes.filter((element: any) => {
        return element.nombrereceta.toLowerCase().includes(recipesFound);
      });
    } else {
      this.recipesAll = this.recipes;
    }
  }
}
