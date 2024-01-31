import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { RecipeService } from 'src/app/services/recipes.service';
import {Storage} from '@capacitor/storage';

//TODO:LLevar a clase de modelos y exportarlos!!! Vale?? venga queda poco ya
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
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userEmail: string;
  swiperModules = [IonicSlides];

  //tiparlo a recetas con clase o interface
  selectedRecipeType!:string;
  recipes: Recipe[] = [];
  recipesAll: Recipe[] = [];
  recipesFound: string;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  async ngOnInit() {
    /*
    this.recipes = [
      { 
        id:1,
        imagenreceta: 'assets/img/chinese.png',
        name: 'Spaghetti Carbonara',
        tipo_receta: 'Italiana',
        puntuacion: 5,
        comensales: 2,
        tiempo_preparacion: 20,
        dificultad: 'media', 
      },
      {
        id:2,
        imagenreceta: 'assets/img/japanese.png',
        name: 'Taco de Carnitas',
        tipo_receta: 'Mejicana',
        puntuacion: 5,
        comensales: 4,
        tiempo_preparacion: 30,
        dificultad: 'baja', 
      },
      {
        id:3,
        imagenreceta: 'assets/img/vegetarian.png',
        name: 'Margherita Pizza',
        tipo_receta: 'IItaliana',
        puntuacion: 5,
        comensales: 3,
        tiempo_preparacion: 25,
        dificultad: 'media', 
      },
    ];
    this.recipesAll = this.recipes;
    */
    const result = await Storage.get({ key: 'userEmail' });
    this.userEmail = localStorage.getItem('userEmail');
    console.log('USER-EMAIL!!!', this.userEmail);
    await this.getDataFromServer();

  }
  //TODO: Aqui tengo que meterlo en lo de favoritas para que cada vez que lo actualize pues se ponga esa receta
  public async ionViewWillEnter() {
    await this.getDataFromServer();
  }

  public navigateToFullRecipes(recipeId:number) {
    this.router.navigate(['/tabs/recipes', recipeId], {
      queryParams: {
        page: 'home'
      }
    });
  }

  public mostrarCero(): void {
    this.recipesAll=[];
  }

  private async getDataFromServer(): Promise<void> {
    this.recipeService.getRecipes().subscribe((data: any) => {
      if (Array.isArray(data)) {
        console.log('data', data);
        this.recipes = data;
        this.recipesAll = data;
      } else {
        console.error('Error al recibir los datos');
      }
    });
  }

  private async geRecipesWorld(selectedWorldRecipe:string): Promise<void> {
    this.recipeService.getRecipesByWorldType(selectedWorldRecipe).subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.recipes = data;
        this.recipesAll = data;
      } else {
        console.error('Error al recibir los datos');
      }
    });
  }

  public handleRecipesFound(recipesFound: string): void {
    this.recipesFound = recipesFound;
    if (recipesFound) {
      this.recipesAll = this.recipes.filter((element: any) => {
        return element.nombrereceta.toLowerCase().includes(recipesFound);
      });
    } else {
      this.recipesAll = this.recipes;
    }
    console.log(this.recipesAll);
  }

  public async onRecipeTypeSelected(recipeType: string): Promise<void> {
    this.selectedRecipeType = recipeType;
    console.log(this.selectedRecipeType);
    if(this.selectedRecipeType && this.selectedRecipeType === 'world') {
      await this.getDataFromServer();
    } else if(this.selectedRecipeType) {
      await this.geRecipesWorld(this.selectedRecipeType);
    }

    // Perform any additional logic or database calls based on the selected recipeType
  }
}
