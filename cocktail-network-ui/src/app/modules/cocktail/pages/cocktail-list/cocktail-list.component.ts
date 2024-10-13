import {Component, OnInit} from '@angular/core';
import {CocktailService} from "../../../../services/services/cocktail.service";
import {Router} from "@angular/router";
import {PageResponseCocktailResponse} from "../../../../services/models/page-response-cocktail-response";
import {CocktailResponse} from "../../../../services/models/cocktail-response";



@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {
  cocktailResponse: PageResponseCocktailResponse = {};
  size = 4;
  page = 0;
  message = '';
  level = 'success';
  searched = false;


  constructor(
    private cocktailService: CocktailService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllCocktails();
  }


  private findAllCocktails() {
    this.cocktailService.findAllCocktails({
      size: this.size,
      page: this.page
    }).subscribe({
      next: (cocktails) => {
        this.cocktailResponse = cocktails;
      }
    });
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

  displayBookDetails(cocktail: CocktailResponse) {
    this.router.navigate(['cocktails', 'details', cocktail.id]);
  }

  addToFavorites(cocktail: CocktailResponse) {

  }


  searchBook() {
    const searchValue = (document.getElementById('inputId') as HTMLInputElement).value;
    this.page = 0;
    if (searchValue) {
      this.cocktailService.findAllCocktailsByString({
        size: this.size,
        page: this.page,
        search: searchValue
      }).subscribe({
        next: (cocktails) => {
          this.cocktailResponse = cocktails;
        },
        error: (err) => {
          console.error('Error fetching cocktails:', err);
        }
      });
    } else {
      this.findAllCocktails();
    }
  }
}
