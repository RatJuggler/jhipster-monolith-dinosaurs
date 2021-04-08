package com.rj.dinosaurs.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CladeMapperTest {

    private CladeMapper cladeMapper;

    @BeforeEach
    public void setUp() {
        cladeMapper = new CladeMapperImpl();
    }
}
