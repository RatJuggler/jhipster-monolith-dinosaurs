package com.rj.dinosaurs.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.rj.dinosaurs.domain.Era} entity.
 */
public class EraDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Size(max = 64)
    private String name;

    @Min(value = 0)
    @Max(value = 999)
    private Integer fromMa;

    @Min(value = 0)
    @Max(value = 999)
    private Integer toMa;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getFromMa() {
        return fromMa;
    }

    public void setFromMa(Integer fromMa) {
        this.fromMa = fromMa;
    }

    public Integer getToMa() {
        return toMa;
    }

    public void setToMa(Integer toMa) {
        this.toMa = toMa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EraDTO)) {
            return false;
        }

        return id != null && id.equals(((EraDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EraDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fromMa=" + getFromMa() +
            ", toMa=" + getToMa() +
            "}";
    }
}
