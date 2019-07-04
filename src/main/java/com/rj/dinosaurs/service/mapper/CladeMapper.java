package com.rj.dinosaurs.service.mapper;

import com.rj.dinosaurs.domain.*;
import com.rj.dinosaurs.service.dto.CladeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Clade and its DTO CladeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CladeMapper extends EntityMapper<CladeDTO, Clade> {



    default Clade fromId(Long id) {
        if (id == null) {
            return null;
        }
        Clade clade = new Clade();
        clade.setId(id);
        return clade;
    }
}
