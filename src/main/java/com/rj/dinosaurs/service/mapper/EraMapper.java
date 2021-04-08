package com.rj.dinosaurs.service.mapper;

import com.rj.dinosaurs.domain.*;
import com.rj.dinosaurs.service.dto.EraDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Era} and its DTO {@link EraDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EraMapper extends EntityMapper<EraDTO, Era> {
    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    EraDTO toDtoName(Era era);
}
