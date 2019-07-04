package com.rj.dinosaurs.service;

import com.rj.dinosaurs.service.dto.CladeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Clade.
 */
public interface CladeService {

    /**
     * Save a clade.
     *
     * @param cladeDTO the entity to save
     * @return the persisted entity
     */
    CladeDTO save(CladeDTO cladeDTO);

    /**
     * Get all the clades.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CladeDTO> findAll(Pageable pageable);


    /**
     * Get the "id" clade.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CladeDTO> findOne(Long id);

    /**
     * Delete the "id" clade.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
