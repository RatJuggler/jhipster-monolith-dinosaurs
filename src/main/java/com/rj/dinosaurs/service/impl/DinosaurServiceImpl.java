package com.rj.dinosaurs.service.impl;

import com.rj.dinosaurs.service.DinosaurService;
import com.rj.dinosaurs.domain.Dinosaur;
import com.rj.dinosaurs.repository.DinosaurRepository;
import com.rj.dinosaurs.service.dto.DinosaurDTO;
import com.rj.dinosaurs.service.mapper.DinosaurMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Dinosaur}.
 */
@Service
@Transactional
public class DinosaurServiceImpl implements DinosaurService {

    private final Logger log = LoggerFactory.getLogger(DinosaurServiceImpl.class);

    private final DinosaurRepository dinosaurRepository;

    private final DinosaurMapper dinosaurMapper;

    public DinosaurServiceImpl(DinosaurRepository dinosaurRepository, DinosaurMapper dinosaurMapper) {
        this.dinosaurRepository = dinosaurRepository;
        this.dinosaurMapper = dinosaurMapper;
    }

    /**
     * Save a dinosaur.
     *
     * @param dinosaurDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DinosaurDTO save(DinosaurDTO dinosaurDTO) {
        log.debug("Request to save Dinosaur : {}", dinosaurDTO);
        Dinosaur dinosaur = dinosaurMapper.toEntity(dinosaurDTO);
        dinosaur = dinosaurRepository.save(dinosaur);
        return dinosaurMapper.toDto(dinosaur);
    }

    /**
     * Get all the dinosaurs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DinosaurDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Dinosaurs");
        return dinosaurRepository.findAll(pageable)
            .map(dinosaurMapper::toDto);
    }


    /**
     * Get one dinosaur by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DinosaurDTO> findOne(Long id) {
        log.debug("Request to get Dinosaur : {}", id);
        return dinosaurRepository.findById(id)
            .map(dinosaurMapper::toDto);
    }

    /**
     * Delete the dinosaur by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dinosaur : {}", id);
        dinosaurRepository.deleteById(id);
    }
}
