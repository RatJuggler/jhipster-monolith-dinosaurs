package com.rj.dinosaurs.service;

import com.rj.dinosaurs.service.dto.EraDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.rj.dinosaurs.domain.Era}.
 */
public interface EraService {
    /**
     * Save a era.
     *
     * @param eraDTO the entity to save.
     * @return the persisted entity.
     */
    EraDTO save(EraDTO eraDTO);

    /**
     * Partially updates a era.
     *
     * @param eraDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<EraDTO> partialUpdate(EraDTO eraDTO);

    /**
     * Get all the eras.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EraDTO> findAll(Pageable pageable);

    /**
     * Get the "id" era.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EraDTO> findOne(Long id);

    /**
     * Delete the "id" era.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
