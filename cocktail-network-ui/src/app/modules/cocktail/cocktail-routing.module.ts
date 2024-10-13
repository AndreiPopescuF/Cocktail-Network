import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {CocktailListComponent} from "./pages/cocktail-list/cocktail-list.component";
import {MyCocktailsComponent} from "./pages/my-cocktails/my-cocktails.component";
import {ManageCocktailComponent} from "./pages/manage-cocktail/manage-cocktail.component";
import {authGuard} from "../../services/guard/auth.guard";
import {CocktailDetailsComponent} from "./pages/cocktail-details/cocktail-details.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: CocktailListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-cocktails',
        component: MyCocktailsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageCocktailComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:cocktailId',
        component: ManageCocktailComponent,
        canActivate: [authGuard]
      },
      {
        path: 'details/:cocktailId',
        component: CocktailDetailsComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocktailRoutingModule { }
