package com.rj.dinosaurs.service;

import com.rj.dinosaurs.service.dto.DinosaurDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Dinosaur.
 */
public interface DinosaurService {

    /**
     * Save a dinosaur.
     *
     * @param dinosaurDTO the entity to save
     * @return the persisted entity
     */
    DinosaurDTO save(DinosaurDTO dinosaurDTO);

    /**
     * Get all the dinosaurs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DinosaurDTO> findAll(Pageable pageable);


    /**
     * Get the "id" dinosaur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DinosaurDTO> findOne(Long id);

    /**
     * Delete the "id" dinosaur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
