package com.andrei.cocktail.cocktail;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CocktailRequest(
        Integer id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String authorName,
        @NotNull(message = "103")
        @NotEmpty(message = "103")
        String recipe
) {
}
