package com.rj.dinosaurs.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.rj.dinosaurs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EraTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Era.class);
        Era era1 = new Era();
        era1.setId(1L);
        Era era2 = new Era();
        era2.setId(era1.getId());
        assertThat(era1).isEqualTo(era2);
        era2.setId(2L);
        assertThat(era1).isNotEqualTo(era2);
        era1.setId(null);
        assertThat(era1).isNotEqualTo(era2);
    }
}
