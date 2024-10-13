import {Component, OnInit} from '@angular/core';
import {PageResponseCocktailResponse} from "../../../../services/models/page-response-cocktail-response";
import {CocktailService} from "../../../../services/services/cocktail.service";
import {Router} from "@angular/router";
import {CocktailResponse} from "../../../../services/models/cocktail-response";

@Component({
  selector: 'app-my-cocktails',
  templateUrl: './my-cocktails.component.html',
  styleUrls: ['./my-cocktails.component.scss']
})
export class MyCocktailsComponent implements OnInit{
  cocktailResponse: PageResponseCocktailResponse = {};
  size = 4;
  page = 0;


  constructor(
    private cocktailService: CocktailService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllCocktails();
  }


  private findAllCocktails() {
    this.cocktailService.findAllCocktailsByOwner({
      size: this.size,
      page: this.page
    }).subscribe({
      next: (cocktails) => {
        this.cocktailResponse = cocktails;
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllCocktails();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllCocktails();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllCocktails();
  }

  goToNextPage() {
    this.page++;
    this.findAllCocktails();
  }

  goToLastPage() {
    this.page = this.cocktailResponse.totalPages as number - 1;
    this.findAllCocktails();
  }

  get isLastPage(): boolean {
    return this.page == this.cocktailResponse.totalPages as number - 1;
  }


  editCocktail(cocktail: CocktailResponse) {
    this.router.navigate(['cocktails', 'manage', cocktail.id]);
  }

  deleteCocktail(cocktail: CocktailResponse) {
    this.cocktailService.deleteCocktail({
      "cocktail-id": cocktail.id as number,
    }).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
