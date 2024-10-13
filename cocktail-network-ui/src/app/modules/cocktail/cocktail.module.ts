import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocktailRoutingModule } from './cocktail-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { CocktailListComponent } from './pages/cocktail-list/cocktail-list.component';
import { CocktailCardComponent } from './components/cocktail-card/cocktail-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { MyCocktailsComponent } from './pages/my-cocktails/my-cocktails.component';
import { ManageCocktailComponent } from './pages/manage-cocktail/manage-cocktail.component';
import {FormsModule} from "@angular/forms";
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { UserListComponent } from './components/user-list/user-list.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    CocktailListComponent,
    CocktailCardComponent,
    RatingComponent,
    MyCocktailsComponent,
    ManageCocktailComponent,
    CocktailDetailsComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    CocktailRoutingModule,
    FormsModule
  ]
})
export class CocktailModule { }
