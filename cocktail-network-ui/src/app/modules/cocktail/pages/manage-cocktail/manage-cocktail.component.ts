import {Component, OnInit} from '@angular/core';
import {CocktailRequest} from "../../../../services/models/cocktail-request";
import {CocktailService} from "../../../../services/services/cocktail.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-manage-cocktail',
  templateUrl: './manage-cocktail.component.html',
  styleUrls: ['./manage-cocktail.component.scss']
})
export class ManageCocktailComponent implements OnInit{

  cocktailRequest: CocktailRequest = {authorName: "", recipe: "", title: ""};
  errorMsg: Array<string> = [];
  selectedCocktailCover: any;
  selectedPicture: string | undefined;


  constructor(
    private cocktailService: CocktailService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  onFileSelected(event: any) {
    this.selectedCocktailCover = event.target.files[0];
    console.log(this.selectedCocktailCover);
    if (this.selectedCocktailCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedCocktailCover);
    }
  }

  saveCocktail() {
    this.cocktailService.saveCocktail({
      body: this.cocktailRequest
    }).subscribe({
      next: (cocktailId) => {
        this.cocktailService.uploadCocktailCoverPicture({
          "cocktail-id": cocktailId,
          body: {
            file: this.selectedCocktailCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['cocktails/my-cocktails']);
          }
        });
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  ngOnInit(): void {
    const cocktailId = this.activatedRoute.snapshot.params['cocktailId'];
    if (cocktailId) {
      this.cocktailService.findCocktailById({
        "cocktail-id": cocktailId
      }).subscribe({
        next: (cocktail) => {
          this.cocktailRequest = {
            id: cocktail.id,
            title: cocktail.title as string,
            authorName: cocktail.authorName as string,
            recipe: cocktail.recipe as string
          }
          if (cocktail.cover) {
            this.selectedPicture = 'data:image/jpg;base64,' + cocktail.cover;
          }
        }
      })
    }
  }
}
