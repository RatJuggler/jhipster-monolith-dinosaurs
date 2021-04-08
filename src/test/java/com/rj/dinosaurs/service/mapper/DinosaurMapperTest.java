package com.rj.dinosaurs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DinosaurMapperTest {

    private DinosaurMapper dinosaurMapper;

    @BeforeEach
    public void setUp() {
        dinosaurMapper = new DinosaurMapperImpl();
    }
}
