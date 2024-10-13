package com.andrei.cocktail.feedback;

import com.andrei.cocktail.cocktail.Cocktail;
import com.andrei.cocktail.cocktail.CocktailRepository;
import com.andrei.cocktail.common.PageResponse;
import com.andrei.cocktail.exception.OperationNotPermittedException;
import com.andrei.cocktail.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final CocktailRepository cocktailRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;

    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        Cocktail cocktail = cocktailRepository.findById(request.cocktailId())
                .orElseThrow(() -> new EntityNotFoundException("No cocktail found with ID:: " + request.cocktailId()));
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(cocktail.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give feedback to your own cocktail");
        }
        Feedback feedback = feedbackMapper.toFeedback(request);
        return feedbackRepository.save(feedback).getId();
    }

    public PageResponse<FeedbackResponse> findAllFeedbacksByCocktail(Integer cocktailId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllByCocktailId(cocktailId, pageable);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream()
                .map(f -> feedbackMapper.toFeedbackResponse(f, user.getId()))
                .toList();
        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
                );
    }
}
