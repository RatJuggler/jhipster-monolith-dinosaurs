package com.rj.dinosaurs.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.rj.dinosaurs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CladeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CladeDTO.class);
        CladeDTO cladeDTO1 = new CladeDTO();
        cladeDTO1.setId(1L);
        CladeDTO cladeDTO2 = new CladeDTO();
        assertThat(cladeDTO1).isNotEqualTo(cladeDTO2);
        cladeDTO2.setId(cladeDTO1.getId());
        assertThat(cladeDTO1).isEqualTo(cladeDTO2);
        cladeDTO2.setId(2L);
        assertThat(cladeDTO1).isNotEqualTo(cladeDTO2);
        cladeDTO1.setId(null);
        assertThat(cladeDTO1).isNotEqualTo(cladeDTO2);
    }
}
