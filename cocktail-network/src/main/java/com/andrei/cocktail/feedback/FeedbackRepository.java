package com.andrei.cocktail.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    @Query("""
            SELECT feedback
            FROM Feedback feedback
            WHERE feedback.cocktail.id = :cocktailId
            """)
    Page<Feedback> findAllByCocktailId(Integer cocktailId, Pageable pageable);

    @Modifying
    @Query("""
            DELETE FROM Feedback f
            WHERE f.cocktail.id = :cocktailId
            """)
    void deleteByCocktailId(Integer cocktailId);
}
