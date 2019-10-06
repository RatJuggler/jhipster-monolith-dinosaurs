package com.rj.dinosaurs.service.impl;

import com.rj.dinosaurs.service.EraService;
import com.rj.dinosaurs.domain.Era;
import com.rj.dinosaurs.repository.EraRepository;
import com.rj.dinosaurs.service.dto.EraDTO;
import com.rj.dinosaurs.service.mapper.EraMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Era}.
 */
@Service
@Transactional
public class EraServiceImpl implements EraService {

    private final Logger log = LoggerFactory.getLogger(EraServiceImpl.class);

    private final EraRepository eraRepository;

    private final EraMapper eraMapper;

    public EraServiceImpl(EraRepository eraRepository, EraMapper eraMapper) {
        this.eraRepository = eraRepository;
        this.eraMapper = eraMapper;
    }

    /**
     * Save a era.
     *
     * @param eraDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public EraDTO save(EraDTO eraDTO) {
        log.debug("Request to save Era : {}", eraDTO);
        Era era = eraMapper.toEntity(eraDTO);
        era = eraRepository.save(era);
        return eraMapper.toDto(era);
    }

    /**
     * Get all the eras.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EraDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Eras");
        return eraRepository.findAll(pageable)
            .map(eraMapper::toDto);
    }


    /**
     * Get one era by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EraDTO> findOne(Long id) {
        log.debug("Request to get Era : {}", id);
        return eraRepository.findById(id)
            .map(eraMapper::toDto);
    }

    /**
     * Delete the era by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Era : {}", id);
        eraRepository.deleteById(id);
    }
}
