package com.rj.dinosaurs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.rj.dinosaurs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DinosaurTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dinosaur.class);
        Dinosaur dinosaur1 = new Dinosaur();
        dinosaur1.setId(1L);
        Dinosaur dinosaur2 = new Dinosaur();
        dinosaur2.setId(dinosaur1.getId());
        assertThat(dinosaur1).isEqualTo(dinosaur2);
        dinosaur2.setId(2L);
        assertThat(dinosaur1).isNotEqualTo(dinosaur2);
        dinosaur1.setId(null);
        assertThat(dinosaur1).isNotEqualTo(dinosaur2);
    }
}
