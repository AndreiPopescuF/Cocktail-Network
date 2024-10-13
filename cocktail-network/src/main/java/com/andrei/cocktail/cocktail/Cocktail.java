package com.andrei.cocktail.cocktail;


import com.andrei.cocktail.common.BaseEntity;
import com.andrei.cocktail.feedback.Feedback;
import com.andrei.cocktail.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cocktail extends BaseEntity {


    private String title;
    private String authorName;
    private String recipe;
    private String cover;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Feedback> feedbacks;



    @Transient
    public double getRate() {
        if(feedbacks == null || feedbacks.isEmpty()) {
            return 0.0;
        }
        var rate = this.feedbacks.stream()
                .mapToDouble(Feedback::getNote)
                .average()
                .orElse(0.0);
        return Math.round(rate * 10.0) / 10.0;
    }

}
