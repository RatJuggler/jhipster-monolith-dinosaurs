package com.rj.dinosaurs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.rj.dinosaurs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DinosaurDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DinosaurDTO.class);
        DinosaurDTO dinosaurDTO1 = new DinosaurDTO();
        dinosaurDTO1.setId(1L);
        DinosaurDTO dinosaurDTO2 = new DinosaurDTO();
        assertThat(dinosaurDTO1).isNotEqualTo(dinosaurDTO2);
        dinosaurDTO2.setId(dinosaurDTO1.getId());
        assertThat(dinosaurDTO1).isEqualTo(dinosaurDTO2);
        dinosaurDTO2.setId(2L);
        assertThat(dinosaurDTO1).isNotEqualTo(dinosaurDTO2);
        dinosaurDTO1.setId(null);
        assertThat(dinosaurDTO1).isNotEqualTo(dinosaurDTO2);
    }
}
