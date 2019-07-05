package com.rj.dinosaurs.service.mapper;

import com.rj.dinosaurs.domain.*;
import com.rj.dinosaurs.service.dto.EraDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Era} and its DTO {@link EraDTO}.
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
