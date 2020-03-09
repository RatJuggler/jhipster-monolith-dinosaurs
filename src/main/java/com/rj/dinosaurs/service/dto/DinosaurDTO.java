package com.rj.dinosaurs.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.rj.dinosaurs.domain.enumeration.Diet;

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


    private Long eraId;

    private String eraName;

    private Long cladeId;

    private String cladeDescription;
    
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

    public Long getEraId() {
        return eraId;
    }

    public void setEraId(Long eraId) {
        this.eraId = eraId;
    }

    public String getEraName() {
        return eraName;
    }

    public void setEraName(String eraName) {
        this.eraName = eraName;
    }

    public Long getCladeId() {
        return cladeId;
    }

    public void setCladeId(Long cladeId) {
        this.cladeId = cladeId;
    }

    public String getCladeDescription() {
        return cladeDescription;
    }

    public void setCladeDescription(String cladeDescription) {
        this.cladeDescription = cladeDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DinosaurDTO dinosaurDTO = (DinosaurDTO) o;
        if (dinosaurDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dinosaurDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

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
            ", eraId=" + getEraId() +
            ", eraName='" + getEraName() + "'" +
            ", cladeId=" + getCladeId() +
            ", cladeDescription='" + getCladeDescription() + "'" +
            "}";
    }
}
