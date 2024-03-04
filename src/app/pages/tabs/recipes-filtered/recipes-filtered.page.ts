import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Recipe } from 'src/app/models/interfaces/recipes.interface';
import { RecipeService } from 'src/app/services/recipes.service';

interface NotFoundSearch {
  title:string;
  elements:any[]
}

@Component({
  selector: 'app-recipes-filtered',
  templateUrl: './recipes-filtered.page.html',
  styleUrls: ['./recipes-filtered.page.scss'],
})
export class RecipesFilteredPage implements OnInit {

 
  recipes:Recipe[]=[];
  titleNotFound:string[]=['Tipo de receta','Tiempo de preparación','Dificultad','Receta del mundo','Ingredientes','Puntuación','Restricción alimentaria','Num-Comensales'];
  searchParams:NotFoundSearch[]=[];
  comenFilter:number;
  recipesAll:Recipe[]=[];
  recipesFound:string;
  queryParams: any;

  constructor(private route: ActivatedRoute,private recipesService: RecipeService, private loadingController: LoadingController) { }
   async ngOnInit():Promise<void> {
    // Mostrar el loader
    //await this.presentLoading();
  
    // Recuperar los parámetros de la URL
    this.route.queryParams.subscribe(params => {


      //this.queryParams = params;
     
      let tipoReceta = params['tipoReceta'];
      let tiempoPreparacion = params['tiempoPreparacion'];
      let dificultad = params['dificultad'];
      let tipoRecetaMundo = params['tipoRecetaMundo'];
      let ingredientes = params['ingredientes'];
      let puntuacion = params['puntuacion'];
      let restric_alimentaria = params['restric_alimentaria'];
      let num_comen_parametro = params['comensales'];

      
      if(tipoReceta === 'no-aply') {
        tipoReceta = 'No aplica';
      }
       if (tiempoPreparacion === '0') {
        tiempoPreparacion = 'No aplica';
      }
       if (dificultad === 'no-aply') {
        dificultad = 'No aplica';
      }
       if (tipoRecetaMundo  === 'no-aply') {
        tipoRecetaMundo = 'No aplica';
      }
       if (puntuacion === '99') {
        puntuacion = 'No aplica';
      }
       if (restric_alimentaria === 'no-aply') {
        restric_alimentaria = 'No aplica';
      }
       if (num_comen_parametro === '99') {
        num_comen_parametro = 'No aplica';
      }
      
      
      this.searchParams.push({title:'Tipo de tipoReceta',elements:tipoReceta},
      {title:'Tiempo de preparación',elements:tiempoPreparacion},
      {title:'Dificultad receta',elements:dificultad},
      {title:'Recetas del mundo',elements:tipoRecetaMundo},
      {title:'Ingredientes',elements:ingredientes},
      {title:'Puntuación',elements:puntuacion},
      {title:'Restricción alimentaria',elements:restric_alimentaria},
      {title:'Número de comensales',elements:num_comen_parametro});

       this.recipesService.getFilteredRecipes(params).subscribe((data: any) => {
      
        this.recipes = data.finalResultofQuery;
        this.recipesAll = data.finalResultofQuery;
        this.comenFilter = data.comenFilter;
      });
    });
  }
  
  public handleRecipesFound(recipesFound: string): void {
    this.recipesFound =  recipesFound;
    if(this.recipesFound) {
     this.recipesAll = this.recipes.filter((element:any) => {
      return element.nombrereceta.toLowerCase().includes(recipesFound);
      });
    } else {
      this.recipesAll = this.recipes;
    }
  }
}