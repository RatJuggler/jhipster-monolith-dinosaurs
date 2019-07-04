package com.rj.dinosaurs.service.mapper;

import com.rj.dinosaurs.domain.*;
import com.rj.dinosaurs.service.dto.EraDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Era and its DTO EraDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EraMapper extends EntityMapper<EraDTO, Era> {



    default Era fromId(Long id) {
        if (id == null) {
            return null;
        }
        Era era = new Era();
        era.setId(id);
        return era;
    }
}
