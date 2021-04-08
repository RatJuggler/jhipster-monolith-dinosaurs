package com.rj.dinosaurs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.rj.dinosaurs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CladeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Clade.class);
        Clade clade1 = new Clade();
        clade1.setId(1L);
        Clade clade2 = new Clade();
        clade2.setId(clade1.getId());
        assertThat(clade1).isEqualTo(clade2);
        clade2.setId(2L);
        assertThat(clade1).isNotEqualTo(clade2);
        clade1.setId(null);
        assertThat(clade1).isNotEqualTo(clade2);
    }
}
