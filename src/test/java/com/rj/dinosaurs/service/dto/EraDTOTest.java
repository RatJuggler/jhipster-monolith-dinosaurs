package com.rj.dinosaurs.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rj.dinosaurs.web.rest.TestUtil;

public class EraDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EraDTO.class);
        EraDTO eraDTO1 = new EraDTO();
        eraDTO1.setId(1L);
        EraDTO eraDTO2 = new EraDTO();
        assertThat(eraDTO1).isNotEqualTo(eraDTO2);
        eraDTO2.setId(eraDTO1.getId());
        assertThat(eraDTO1).isEqualTo(eraDTO2);
        eraDTO2.setId(2L);
        assertThat(eraDTO1).isNotEqualTo(eraDTO2);
        eraDTO1.setId(null);
        assertThat(eraDTO1).isNotEqualTo(eraDTO2);
    }
}
