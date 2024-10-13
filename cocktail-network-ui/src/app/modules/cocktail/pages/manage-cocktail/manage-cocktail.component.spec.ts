import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCocktailComponent } from './manage-cocktail.component';

describe('ManageCocktailComponent', () => {
  let component: ManageCocktailComponent;
  let fixture: ComponentFixture<ManageCocktailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCocktailComponent]
    });
    fixture = TestBed.createComponent(ManageCocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
