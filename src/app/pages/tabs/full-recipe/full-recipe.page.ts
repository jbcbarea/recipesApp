import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { FavouriteRecipesService } from 'src/app/services/favourite-recipes.service';
import { GeneratePdfService } from 'src/app/services/generate-pdf.service';
import { RecipeService } from 'src/app/services/recipes.service';
import { ScoringRecipesService } from 'src/app/services/scoring-recipes.service';

interface IngredientesPDF {
  nombre: string;
  cantidad: number;
  unidad: string;
}

@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.page.html',
  styleUrls: ['./full-recipe.page.scss'],
})
export class FullRecipePage implements OnInit {
  recipeId: number; // Declaración de la variable para almacenar el recipeId
  //tipar
  originPage: string;
  recipeScoring: number;
  base64Photo: string;
  base64Logo: string;
  recipeVotes: number;
  comenFilter: number;
  recipeScoringByUser: number;
  selectedRating: number;
  recipeCalories: number;
  deleteFavourite: boolean;
  favouriteRecipe: boolean;
  ingredientesPDF: IngredientesPDF[] = [];
  recipe_Full: any;
  isVoting = false;

  constructor(
    private route: ActivatedRoute,
    private readonly recipesService: RecipeService,
    private readonly favRecipeService: FavouriteRecipesService,
    private readonly toastController: ToastController,
    private readonly scoringRecipeService: ScoringRecipesService,
    private readonly generatePdfService: GeneratePdfService,
    private navCtrl: NavController
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el recipeId de la ruta actual
    console.log('DESDE FULL RECIPE');
    this.route.params.subscribe(async (params) => {
      this.recipeId = params['recipeId'];
      this.originPage = this.route.snapshot.queryParamMap.get('page');
      this.comenFilter = params['comenFilter'];
      // Llamar a la base de datos con el recipeId
      // Tu lógica para recuperar los datos de la base de datos basados en this.recipeId

      this.getRecipeImageBase64ById(this.recipeId);
      //await this.getDataFromServerFilteredRecepis();

      await this.getDataFromServer(this.recipeId);
      await this.checkFavouriteRecipe(
        this.recipeId,
        localStorage.getItem('userEmail')
      );
      await this.getScoringRecipeById(this.recipeId);
      await this.getScoringRecipeByUser(
        this.recipeId,
        localStorage.getItem('userEmail')
      );
    });
  }

  public goBack() {
    this.navCtrl.navigateBack('/tabs/home');
  }

  public async addToFavorites(): Promise<void> {
    if (!this.favouriteRecipe) {
      await this.addFavouriteRecipe(
        localStorage.getItem('userEmail'),
        this.recipeId
      );
      console.log('Receta añadida a favoritas');
      this.favouriteRecipe = true;
    } else {
      console.log('Ya está introducida esa receta');
    }
  }

  public async deleteFromFavourites(): Promise<void> {
    if (this.favouriteRecipe) {
      await this.favRecipeService
        .deleteFavourite(localStorage.getItem('userEmail'), this.recipeId)
        .subscribe((data) => {
          console.log(data);
          console.log('Receta eliminada de favoritas'); // Update the message
        });
      this.favouriteRecipe = false;
    } else {
      console.log('Ya está introducida esa receta');
    }
  }

  public async submitRating(): Promise<void> {
    if (!this.isVoting) {
      await this.addScoringRecipe(
        this.recipeId,
        localStorage.getItem('userEmail'),

        
        this.selectedRating
      );
      this.isVoting = true;
    }
  }

  public async submitDeleteRating(): Promise<void> {
    if (this.isVoting) {
      await this.deleteScoringRecipe(
        this.recipeId,
        localStorage.getItem('userEmail')
      );
      this.isVoting = false;
    }
  }

  public generatePdf(): void {
    this.setIngredientsPdf();

    const recipeDetails = {
      recipeName: this.recipe_Full.nombrereceta,
      tipoCocina: this.recipe_Full.tipo_receta,
      comensales: this.recipe_Full.comensales,
      tiempoPreparacion: this.recipe_Full.tiempo_preparacion,
      dificultad: this.recipe_Full.dificultad,
      fechaCreacion: this.recipe_Full.fecha_creacion.split('T')[0],
      creadoPor: this.recipe_Full.creado_por,
      puntuacion: this.recipe_Full.puntuacion,
      votaciones: this.recipe_Full.votos,
      ingredientes: this.ingredientesPDF,
      preparacion: this.recipe_Full.pasos_receta,
      caloriasTotales: this.recipeCalories,
    };
    this.generatePdfService.generatePdf(
      this.base64Logo,
      this.base64Photo,
      recipeDetails
    );
  }

  private getRecipeImageBase64ById(recipeId: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.recipesService
        .getRecipeImageByIdBase64(recipeId)
        .subscribe((data: any) => {
          this.base64Photo = 'data:image/png;base64,' + data.base64;
          this.base64Logo = 'data:image/png;base64,' + data.base64Logo;
          resolve();
        });
    });
  }

  private setIngredientsPdf(): void {
    if (this.recipe_Full) {
      //Tienen la misma longitud...
      for (let i = 0; i < this.recipe_Full.ingredientes.length; i++) {
        this.ingredientesPDF.push({
          nombre: this.recipe_Full.ingredientes[i],
          cantidad: this.recipe_Full.cantidades[i],
          unidad: this.recipe_Full.unidades_metricas[i],
        });
      }
    }
  }

  private calculateRecipeCalories(): void {
    let totalCalories: number = 0;
    let totalQuantities: number = 0;
    let totalCaloriesAfterFilter: number = 0;
    for (let j = 0; j < this.recipe_Full.cantidades.length; j++) {
      totalCalories +=
        (this.recipe_Full.calorias_ingrediente[j] *
          this.recipe_Full.cantidades[j]) /
        100;
    }
    if (this.comenFilter) {
      if (this.comenFilter !== this.recipe_Full.comensales) {
        //const filterComensales =Math.abs(this.comenFilter - this.recipe_Full.comensales);
        this.recipeCalories =
          (totalCalories * this.comenFilter) / this.recipe_Full.comensales;
        console.log(this.recipeCalories);
        //   if(Math.sign(filterComensales) === 1) {
        //     totalCaloriesAfterFilter = totalCalories
        //   }
      }
    } else {
      this.recipeCalories = totalCalories;
    }
  }

  private getDataFromServer(recipeId: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.recipesService.getRecipesById(recipeId).subscribe((data: any) => {
        this.recipe_Full = data;
        this.calculateRecipeCalories();
        resolve();
      });
    });
  }

  private async checkFavouriteRecipe(
    recipeId: number,
    userMail: string
  ): Promise<void> {
    this.favRecipeService
      .checkFavouriteRecipe(userMail, recipeId)
      .subscribe((data: any) => {
        this.favouriteRecipe = data;
        console.log(this.favouriteRecipe);
      });
  }

  private async getScoringRecipeById(recipeId: number): Promise<void> {
    this.scoringRecipeService
      .getRecipeScoreById(recipeId)
      .subscribe((data: any) => {
        this.recipeScoring = data.averageScore;
        this.recipeVotes = data.total_votos;
      });
  }

  private async getScoringRecipeByUser(
    recipeId: number,
    userEmail: string
  ): Promise<void> {
    this.scoringRecipeService
      .getRecipeScoreByUser(recipeId, userEmail)
      .subscribe((data: any) => {
        this.recipeScoringByUser = data.recipeScoreUser;
        console.log(this.recipeScoringByUser);
        if (this.recipeScoringByUser !== null) {
          this.isVoting = true;
        }
      });
  }

  private async addScoringRecipe(
    recipeId: number,
    userMail: string,
    recipeScoring: number
  ): Promise<void> {
    this.scoringRecipeService
      .addRecipeScore(recipeId, userMail, recipeScoring)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.presentSuccessToastScoring();
        },
        (error: any) => {
          console.log(error);
          this.presentErrorToastScoring();
        }
      );
  }

  private async deleteScoringRecipe(
    recipeId: number,
    userMail: string
  ): Promise<void> {
    this.scoringRecipeService.deleteRecipeScore(recipeId, userMail).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  private async addFavouriteRecipe(
    userMail: string,
    recipeId: number
  ): Promise<void> {
    this.favRecipeService.addFavouriteRecipe(userMail, recipeId).subscribe(
      (data: any) => {
        console.log(data);
        this.presentSuccessToast();
      },
      (error: any) => {
        console.log(error);
        this.presentErrorToast();
      }
    );
  }

  private async presentSuccessToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Receta añadida a favoritas',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  private async presentErrorToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Error al añadir la receta a favorita',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  private async presentSuccessToastScoring(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Receta puntuada correctamente',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  private async presentErrorToastScoring(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Error al puntuar la receta',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
