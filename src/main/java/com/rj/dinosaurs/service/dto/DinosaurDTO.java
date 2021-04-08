package com.rj.dinosaurs.service.dto;

import com.rj.dinosaurs.domain.enumeration.Diet;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.rj.dinosaurs.domain.Dinosaur} entity.
 */
public class DinosaurDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 64)
    private String name;

    @Min(value = 0)
    @Max(value = 999)
    private Integer weight;

    @Min(value = 0)
    @Max(value = 999)
    private Integer length;

    private Diet diet;

    @NotNull
    private Instant insertDt;

    @NotNull
    private Instant modifiedDt;

    private EraDTO era;

    private CladeDTO clade;

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

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public Diet getDiet() {
        return diet;
    }

    public void setDiet(Diet diet) {
        this.diet = diet;
    }

    public Instant getInsertDt() {
        return insertDt;
    }

    public void setInsertDt(Instant insertDt) {
        this.insertDt = insertDt;
    }

    public Instant getModifiedDt() {
        return modifiedDt;
    }

    public void setModifiedDt(Instant modifiedDt) {
        this.modifiedDt = modifiedDt;
    }

    public EraDTO getEra() {
        return era;
    }

    public void setEra(EraDTO era) {
        this.era = era;
    }

    public CladeDTO getClade() {
        return clade;
    }

    public void setClade(CladeDTO clade) {
        this.clade = clade;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DinosaurDTO)) {
            return false;
        }

        DinosaurDTO dinosaurDTO = (DinosaurDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, dinosaurDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DinosaurDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", weight=" + getWeight() +
            ", length=" + getLength() +
            ", diet='" + getDiet() + "'" +
            ", insertDt='" + getInsertDt() + "'" +
            ", modifiedDt='" + getModifiedDt() + "'" +
            ", era=" + getEra() +
            ", clade=" + getClade() +
            "}";
    }
}
