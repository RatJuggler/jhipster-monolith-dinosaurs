package com.rj.dinosaurs.service.mapper;

import com.rj.dinosaurs.domain.*;
import com.rj.dinosaurs.service.dto.CladeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Clade} and its DTO {@link CladeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CladeMapper extends EntityMapper<CladeDTO, Clade> {
    @Named("description")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    CladeDTO toDtoDescription(Clade clade);
}
