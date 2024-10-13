package com.andrei.cocktail.cocktail;

import org.springframework.data.jpa.domain.Specification;

public class CocktailSpecification {

    public static Specification<Cocktail> withOwnerId(Integer ownerId) {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"),ownerId));
    }
}
