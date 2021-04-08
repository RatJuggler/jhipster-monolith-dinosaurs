package com.rj.dinosaurs.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.rj.dinosaurs.domain.Clade} entity.
 */
public class CladeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 64)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CladeDTO)) {
            return false;
        }

        CladeDTO cladeDTO = (CladeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cladeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CladeDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
