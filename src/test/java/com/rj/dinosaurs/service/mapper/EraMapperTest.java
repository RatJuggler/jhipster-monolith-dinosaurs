package com.rj.dinosaurs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EraMapperTest {

    private EraMapper eraMapper;

    @BeforeEach
    public void setUp() {
        eraMapper = new EraMapperImpl();
    }
}
