package com.rj.dinosaurs.service;

import com.rj.dinosaurs.service.dto.EraDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Era.
 */
public interface EraService {

    /**
     * Save a era.
     *
     * @param eraDTO the entity to save
     * @return the persisted entity
     */
    EraDTO save(EraDTO eraDTO);

    /**
     * Get all the eras.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EraDTO> findAll(Pageable pageable);


    /**
     * Get the "id" era.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<EraDTO> findOne(Long id);

    /**
     * Delete the "id" era.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
