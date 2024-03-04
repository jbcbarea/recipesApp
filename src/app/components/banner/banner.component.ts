import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

interface RecipeTypes {
  image:string;
  title:string;
  icon:string;
  recipeType:string;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent  implements OnInit {

  @Output() recipeTypeSelected: EventEmitter<string> = new EventEmitter<string>();

  recipesTypes:RecipeTypes[]=[
    {image:'world-recipes.png',title:'Recetas del Mundo',icon:'world-icon.png',recipeType:'world'},
    {image:'spanish-food.png',title:'Recetas Comida Española',icon:'spain-icon.png',recipeType:'Española'},
    {image:'german-food.png',title:'Recetas Comida Alemana',icon:'germany-icon.png',recipeType:'Alemana'},
    {image:'greek-food.png',title:'Recetas Comida Griega',icon:'greece-icon.png',recipeType:'Griega'},
    {image:'italian-food.png',title:'Recetas Comida Italiana',icon:'italy-icon.png',recipeType:'Italiana'},
    {image:'mexican-food.png',title:'Recetas Comida Mejicána',icon:'mexico-icon.png',recipeType:'Mexicana'},
    {image:'portuguese-food.png',title:'Recetas Comida Portuguesa',icon:'portugal-icon.png',recipeType:'Portuguesa'}
  ]
  swiperModules = [IonicSlides];
  clickedRecipeIndex: number = 0;
  worldrecipeType:string;

  constructor() { }

  ngOnInit() {}

  public handleRecipeClick(index:number): void {
    this.clickedRecipeIndex = index;
    const selectedRecipeType = this.recipesTypes[index].recipeType;
    this.recipeTypeSelected.emit(selectedRecipeType);
  }
}
