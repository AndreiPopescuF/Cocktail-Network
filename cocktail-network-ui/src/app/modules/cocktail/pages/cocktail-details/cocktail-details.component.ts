import {Component, OnInit} from '@angular/core';
import {PageResponseFeedbackResponse} from "../../../../services/models/page-response-feedback-response";
import {CocktailResponse} from "../../../../services/models/cocktail-response";
import {CocktailService} from "../../../../services/services/cocktail.service";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {ActivatedRoute} from "@angular/router";
import {FeedbackRequest} from "../../../../services/models/feedback-request";

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit {

  cocktail: CocktailResponse = {};
  feedbacks: PageResponseFeedbackResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  private cocktailId = 0;
  feedbackRequest: FeedbackRequest = {cocktailId: 0, comment: '', note: 0};

  constructor(
    private cocktailService: CocktailService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.cocktailId = this.activatedRoute.snapshot.params['cocktailId'];
    if (this.cocktailId) {
      this.cocktailService.findCocktailById({
        "cocktail-id": this.cocktailId
      }).subscribe({
        next: (cocktail) => {
          this.cocktail = cocktail;
          this.findAllFeedbacks();
        }
      });
    }
  }

  private findAllFeedbacks() {
    this.feedbackService.findAllFeedbacksByCocktail({
      "cocktail-id": this.cocktailId,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.feedbacks = data;
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFeedbacks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.feedbacks.totalPages as number - 1;
    this.findAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.findAllFeedbacks();
  }

  get isLastPage() {
    return this.page === this.feedbacks.totalPages as number - 1;
  }

  submitFeedback() {
    this.cocktailId = this.activatedRoute.snapshot.params['cocktailId'];
    this.feedbackRequest.cocktailId = this.cocktailId;
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }
    });
    window.location.reload();
  }
}
