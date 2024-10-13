package com.andrei.cocktail.cocktail;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CocktailResponse {

    private Integer id;
    private String title;
    private String authorName;
    private String recipe;
    private String owner;
    private byte[] cover;
    private double rate;
}
