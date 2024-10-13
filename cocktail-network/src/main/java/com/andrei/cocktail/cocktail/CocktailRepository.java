package com.andrei.cocktail.cocktail;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CocktailRepository extends JpaRepository<Cocktail, Integer>, JpaSpecificationExecutor<Cocktail> {

    @Query("""
            SELECT cocktail
            FROM Cocktail cocktail
            WHERE cocktail.owner.id != :userId
            """)
    Page<Cocktail> findAllDisplayableCocktails(Pageable pageable, Integer userId);


    @Query("""
            SELECT cocktail
            FROM Cocktail cocktail
            WHERE cocktail.owner.id != :userId
            AND cocktail.title LIKE :search%
            """)
    Page<Cocktail> findAllDisplayableCocktailsByString(Pageable pageable, Integer userId, String search);

    @Modifying
    @Query("""
            DELETE FROM Cocktail c
            WHERE c.owner.id = :userId
            AND c.id = :cocktailId
            """)
    void deleteCocktail(Integer userId, Integer cocktailId);
}
