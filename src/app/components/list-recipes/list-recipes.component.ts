import { Component, Input, OnInit, ViewChild } from '@angular/core';

enum recipesDifficulty {
  low = 'Baja',
  medium = 'Media',
  high = 'Difícil'
}

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss'],
})
export class ListRecipesComponent  implements OnInit {

  //tipar
  @Input() recipe: any;
  query:string;
  isHovered: boolean = false;
  constructor() { }

  ngOnInit() {}

 public getDifficulty(): string {
    if (this.recipe && this.recipe.dificultad) {
      if (this.recipe.dificultad === recipesDifficulty.low) {
        return 'low-difficulty';
      } else if (this.recipe.dificultad === recipesDifficulty.medium) {
        return 'medium-difficulty';
      } else if (this.recipe.dificultad === recipesDifficulty.high) {
        return 'high-difficulty';
      }
    }
    return ''; // Clase por defecto si no se encuentra una dificultad válida
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  onTouchStart() {
    this.isHovered = true;
  }

  onTouchEnd() {
    this.isHovered = false;
  }
}
