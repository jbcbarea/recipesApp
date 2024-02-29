import { Component, Input, OnInit, ViewChild } from '@angular/core';

enum recipesDifficulty {
  low = 'Fácil',
  medium = 'Media',
  high = 'Difícil',
}

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss'],
})
export class ListRecipesComponent implements OnInit {
  @Input() recipe: any;
  query: string;
  isHovered: boolean = false;
  constructor() {}

  ngOnInit() {}
  public getDifficultyColor(): string {
    if (this.recipe && this.recipe.dificultad) {
      switch (this.recipe.dificultad.trim().toLowerCase()) {
        case 'fácil':
          return 'green';
        case 'media':
          return 'var(--ion-color-warning)';
        case 'difícil':
          return 'red';
        default:
          return ''; // o el color predeterminado que desees
      }
    }
    return ''; // o el color predeterminado que desees
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
