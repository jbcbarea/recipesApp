import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
        pathMatch: 'full'
      },
      {
        path: 'create-recipe',
        loadChildren: () => import('./create-recipe/create-recipe.module').then( m => m.CreateRecipePageModule)
       
      },
      {
        path: 'recipes-ingridients',
        loadChildren: () => import('./recipes-ingridients/recipes-ingridients.module').then( m => m.RecipesIngridientsPageModule)
      },
      {
        path: 'create-ing',
        loadChildren: () => import('./create-ing/create-ing.module').then( m => m.CreateIngPageModule)
      },
      {
        path: 'favourites',
        loadChildren: () => import('./favourites/favourites.module').then( m => m.FavouritesPageModule)
      },
      {
        path: 'user-account',
        loadChildren: () => import('./user-update/user-update.module').then( m => m.UserUpdatePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  //Está fuera ya que no quiero que sse muestren los tabs como en las páginas anteriores vale??
  {
    path: 'recipes/:recipeId',
    loadChildren: () => import('./full-recipe/full-recipe.module').then( m => m.FullRecipePageModule),
    data:{}
  },
  {
    path: 'recipes-filtered',
    loadChildren: () => import('./recipes-filtered/recipes-filtered.module').then( m => m.RecipesFilteredPageModule)
  },
  {
    path: 'user-update',
    loadChildren: () => import('./user-update/user-update.module').then( m => m.UserUpdatePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
