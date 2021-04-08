package com.rj.dinosaurs.service.impl;

import com.rj.dinosaurs.domain.Era;
import com.rj.dinosaurs.repository.EraRepository;
import com.rj.dinosaurs.service.EraService;
import com.rj.dinosaurs.service.dto.EraDTO;
import com.rj.dinosaurs.service.mapper.EraMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public EraDTO save(EraDTO eraDTO) {
        log.debug("Request to save Era : {}", eraDTO);
        Era era = eraMapper.toEntity(eraDTO);
        era = eraRepository.save(era);
        return eraMapper.toDto(era);
    }

    @Override
    public Optional<EraDTO> partialUpdate(EraDTO eraDTO) {
        log.debug("Request to partially update Era : {}", eraDTO);

        return eraRepository
            .findById(eraDTO.getId())
            .map(
                existingEra -> {
                    eraMapper.partialUpdate(existingEra, eraDTO);
                    return existingEra;
                }
            )
            .map(eraRepository::save)
            .map(eraMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EraDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Eras");
        return eraRepository.findAll(pageable).map(eraMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EraDTO> findOne(Long id) {
        log.debug("Request to get Era : {}", id);
        return eraRepository.findById(id).map(eraMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Era : {}", id);
        eraRepository.deleteById(id);
    }
}
