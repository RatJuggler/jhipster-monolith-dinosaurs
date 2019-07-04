package com.rj.dinosaurs.service.impl;

import com.rj.dinosaurs.service.CladeService;
import com.rj.dinosaurs.domain.Clade;
import com.rj.dinosaurs.repository.CladeRepository;
import com.rj.dinosaurs.service.dto.CladeDTO;
import com.rj.dinosaurs.service.mapper.CladeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Clade.
 */
@Service
@Transactional
public class CladeServiceImpl implements CladeService {

    private final Logger log = LoggerFactory.getLogger(CladeServiceImpl.class);

    private final CladeRepository cladeRepository;

    private final CladeMapper cladeMapper;

    public CladeServiceImpl(CladeRepository cladeRepository, CladeMapper cladeMapper) {
        this.cladeRepository = cladeRepository;
        this.cladeMapper = cladeMapper;
    }

    /**
     * Save a clade.
     *
     * @param cladeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CladeDTO save(CladeDTO cladeDTO) {
        log.debug("Request to save Clade : {}", cladeDTO);
        Clade clade = cladeMapper.toEntity(cladeDTO);
        clade = cladeRepository.save(clade);
        return cladeMapper.toDto(clade);
    }

    /**
     * Get all the clades.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CladeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Clades");
        return cladeRepository.findAll(pageable)
            .map(cladeMapper::toDto);
    }


    /**
     * Get one clade by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CladeDTO> findOne(Long id) {
        log.debug("Request to get Clade : {}", id);
        return cladeRepository.findById(id)
            .map(cladeMapper::toDto);
    }

    /**
     * Delete the clade by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Clade : {}", id);
        cladeRepository.deleteById(id);
    }
}
