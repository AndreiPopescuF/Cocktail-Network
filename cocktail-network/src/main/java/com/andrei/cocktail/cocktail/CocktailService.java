package com.andrei.cocktail.cocktail;


import com.andrei.cocktail.common.PageResponse;
import com.andrei.cocktail.feedback.FeedbackRepository;
import com.andrei.cocktail.file.FileStorageService;
import com.andrei.cocktail.user.User;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CocktailService {

    private final CocktailMapper cocktailMapper;
    private final CocktailRepository cocktailRepository;
    private final FileStorageService fileStorageService;
    private final FeedbackRepository feedbackRepository;


    public Integer save(CocktailRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Cocktail cocktail = cocktailMapper.toCocktail(request);
        cocktail.setOwner(user);
        return cocktailRepository.save(cocktail).getId();
    }

    public CocktailResponse findById(Integer cocktailId) {
        return cocktailRepository.findById(cocktailId)
                .map(cocktailMapper::toCocktailResponse)
                .orElseThrow(() -> new EntityNotFoundException("No cocktail found with the id " + cocktailId));

    }

    public PageResponse<CocktailResponse> findAllCocktails(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Cocktail> cocktails = cocktailRepository.findAllDisplayableCocktails(pageable, user.getId());
        List<CocktailResponse> cocktailResponse = cocktails.stream()
                .map(cocktailMapper::toCocktailResponse)
                .toList();
        return new PageResponse<>(
                cocktailResponse,
                cocktails.getNumber(),
                cocktails.getSize(),
                cocktails.getTotalElements(),
                cocktails.getTotalPages(),
                cocktails.isFirst(),
                cocktails.isLast()
        );
    }

    public PageResponse<CocktailResponse> findAllCocktailsByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Cocktail> cocktails = cocktailRepository.findAll(CocktailSpecification.withOwnerId(user.getId()), pageable);
        List<CocktailResponse> cocktailResponse = cocktails.stream()
                .map(cocktailMapper::toCocktailResponse)
                .toList();
        return new PageResponse<>(
                cocktailResponse,
                cocktails.getNumber(),
                cocktails.getSize(),
                cocktails.getTotalElements(),
                cocktails.getTotalPages(),
                cocktails.isFirst(),
                cocktails.isLast()
        );
    }



    public void uploadCocktailCoverPicture(MultipartFile file, Authentication connectedUser, Integer bookId) {
        Cocktail cocktail = cocktailRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("No cocktail found with this id:" + bookId));
        User user = ((User) connectedUser.getPrincipal());
        var cocktailCover = fileStorageService.saveFile(file, user.getId());
        cocktail.setCover(cocktailCover);
        cocktailRepository.save(cocktail);
    }

    public PageResponse<CocktailResponse> findAllCocktailsByString(int page, int size, Authentication connectedUser, String search) {

        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Cocktail> cocktails = cocktailRepository.findAllDisplayableCocktailsByString(pageable, user.getId(), search);
        List<CocktailResponse> cocktailResponse = cocktails.stream()
                .map(cocktailMapper::toCocktailResponse)
                .toList();
        return new PageResponse<>(
                cocktailResponse,
                cocktails.getNumber(),
                cocktails.getSize(),
                cocktails.getTotalElements(),
                cocktails.getTotalPages(),
                cocktails.isFirst(),
                cocktails.isLast()
        );
    }

    @Transactional
    public void deleteCocktail(Authentication connectedUser, Integer cocktailId) {
        User user = ((User) connectedUser.getPrincipal());
        feedbackRepository.deleteByCocktailId(cocktailId);
        cocktailRepository.deleteCocktail(user.getId(), cocktailId);
    }

}


