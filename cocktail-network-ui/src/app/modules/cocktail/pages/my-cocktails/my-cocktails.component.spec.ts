import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCocktailsComponent } from './my-cocktails.component';

describe('MyCocktailsComponent', () => {
  let component: MyCocktailsComponent;
  let fixture: ComponentFixture<MyCocktailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCocktailsComponent]
    });
    fixture = TestBed.createComponent(MyCocktailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
