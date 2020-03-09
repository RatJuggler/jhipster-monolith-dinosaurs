package com.rj.dinosaurs.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class EraMapperTest {

    private EraMapper eraMapper;

    @BeforeEach
    public void setUp() {
        eraMapper = new EraMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(eraMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(eraMapper.fromId(null)).isNull();
    }
}
