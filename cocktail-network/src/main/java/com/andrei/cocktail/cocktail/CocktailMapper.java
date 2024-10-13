package com.andrei.cocktail.cocktail;


import com.andrei.cocktail.file.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class CocktailMapper {

    public Cocktail toCocktail(CocktailRequest request) {
        return Cocktail.builder()
                .id(request.id())
                .title(request.title())
                .authorName(request.authorName())
                .recipe(request.recipe())
                .build();
    }

    public CocktailResponse toCocktailResponse(Cocktail cocktail) {
        return CocktailResponse.builder()
                .id(cocktail.getId())
                .title(cocktail.getTitle())
                .authorName(cocktail.getAuthorName())
                .rate(cocktail.getRate())
                .recipe(cocktail.getRecipe())
                .owner(cocktail.getOwner().fullName())
                .cover(FileUtils.readFileFromLocation(cocktail.getCover()))
                .build();
    }

}
