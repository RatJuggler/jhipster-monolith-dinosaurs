package com.rj.dinosaurs.service.mapper;

import com.rj.dinosaurs.domain.*;
import com.rj.dinosaurs.service.dto.DinosaurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Dinosaur} and its DTO {@link DinosaurDTO}.
 */
@Mapper(componentModel = "spring", uses = {EraMapper.class, CladeMapper.class})
public interface DinosaurMapper extends EntityMapper<DinosaurDTO, Dinosaur> {

    @Mapping(source = "era.id", target = "eraId")
    @Mapping(source = "era.name", target = "eraName")
    @Mapping(source = "clade.id", target = "cladeId")
    @Mapping(source = "clade.description", target = "cladeDescription")
    DinosaurDTO toDto(Dinosaur dinosaur);

    @Mapping(source = "eraId", target = "era")
    @Mapping(source = "cladeId", target = "clade")
    Dinosaur toEntity(DinosaurDTO dinosaurDTO);

    default Dinosaur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Dinosaur dinosaur = new Dinosaur();
        dinosaur.setId(id);
        return dinosaur;
    }
}
