import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CocktailResponse} from "../../../../services/models/cocktail-response";

@Component({
  selector: 'app-cocktail-card',
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.scss']
})
export class CocktailCardComponent {

  private _cocktail: CocktailResponse = {};
  private _manage = false;
  private _cocktailCover: string | undefined;

  get cocktail(): CocktailResponse {
    return this._cocktail;
  }

  @Input()
  set cocktail(value: CocktailResponse) {
    this._cocktail = value;
  }

  get cocktailCover(): string | undefined {
    if (this._cocktail.cover) {
      return 'data:image/jpg;base64,' + this._cocktail.cover;
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private edit: EventEmitter<CocktailResponse> = new EventEmitter<CocktailResponse>();
  @Output() private delete: EventEmitter<CocktailResponse> = new EventEmitter<CocktailResponse>();
  @Output() private addToFavorites: EventEmitter<CocktailResponse> = new EventEmitter<CocktailResponse>();
  @Output() private details: EventEmitter<CocktailResponse> = new EventEmitter<CocktailResponse>();

  onShowDetails() {
    this.details.emit(this._cocktail);
  }

  onAddToFavorites() {
    this.addToFavorites.emit(this._cocktail);
  }

  onEdit() {
    this.edit.emit(this._cocktail);
  }

  onDelete() {
    this.delete.emit(this._cocktail);
  }
}
