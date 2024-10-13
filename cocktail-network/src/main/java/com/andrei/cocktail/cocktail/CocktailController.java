package com.andrei.cocktail.cocktail;

import com.andrei.cocktail.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("cocktails")
@RequiredArgsConstructor
@Tag(name = "Cocktail")
public class CocktailController {

    private final CocktailService service;

    @PostMapping
    public ResponseEntity<Integer> saveCocktail(
            @Valid @RequestBody CocktailRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("{cocktail-id}")
    public ResponseEntity<CocktailResponse> findCocktailById(
            @PathVariable("cocktail-id") Integer cocktailId
    ) {
        return ResponseEntity.ok(service.findById(cocktailId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<CocktailResponse>> findAllCocktails(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllCocktails(page, size, connectedUser));

    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<CocktailResponse>> findAllCocktailsByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {

        return ResponseEntity.ok(service.findAllCocktailsByOwner(page, size, connectedUser));
    }



    @PostMapping(value = "/cover/{cocktail-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadCocktailCoverPicture(
            @PathVariable("cocktail-id") Integer cocktailId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        service.uploadCocktailCoverPicture(file, connectedUser, cocktailId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/cocktail-search")
    public ResponseEntity<PageResponse<CocktailResponse>> findAllCocktailsByString(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(name = "search", defaultValue = "a", required = true) String search,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllCocktailsByString(page, size, connectedUser, search));

    }

    @PostMapping("/delete/{cocktail-id}")
    public void deleteCocktail(
            @PathVariable("cocktail-id") Integer cocktailId,
            Authentication connectedUser
    ) {
        service.deleteCocktail(connectedUser, cocktailId);
    }
}
