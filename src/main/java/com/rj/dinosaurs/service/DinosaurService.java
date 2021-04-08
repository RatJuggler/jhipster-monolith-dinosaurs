package com.rj.dinosaurs.service;

import com.rj.dinosaurs.service.dto.DinosaurDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.rj.dinosaurs.domain.Dinosaur}.
 */
public interface DinosaurService {
    /**
     * Save a dinosaur.
     *
     * @param dinosaurDTO the entity to save.
     * @return the persisted entity.
     */
    DinosaurDTO save(DinosaurDTO dinosaurDTO);

    /**
     * Partially updates a dinosaur.
     *
     * @param dinosaurDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DinosaurDTO> partialUpdate(DinosaurDTO dinosaurDTO);

    /**
     * Get all the dinosaurs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DinosaurDTO> findAll(Pageable pageable);

    /**
     * Get the "id" dinosaur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DinosaurDTO> findOne(Long id);

    /**
     * Delete the "id" dinosaur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
