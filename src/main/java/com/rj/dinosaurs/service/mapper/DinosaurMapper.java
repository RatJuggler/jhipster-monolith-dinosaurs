package com.rj.dinosaurs.service.mapper;

import com.rj.dinosaurs.domain.*;
import com.rj.dinosaurs.service.dto.DinosaurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Dinosaur} and its DTO {@link DinosaurDTO}.
 */
@Mapper(componentModel = "spring", uses = { EraMapper.class, CladeMapper.class })
public interface DinosaurMapper extends EntityMapper<DinosaurDTO, Dinosaur> {
    @Mapping(target = "era", source = "era", qualifiedByName = "name")
    @Mapping(target = "clade", source = "clade", qualifiedByName = "description")
    DinosaurDTO toDto(Dinosaur s);
}
