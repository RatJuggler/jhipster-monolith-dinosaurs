package com.rj.dinosaurs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import com.rj.dinosaurs.domain.enumeration.Diet;

/**
 * A Dinosaur.
 */
@Entity
@Table(name = "dinosaur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Dinosaur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @Min(value = 0)
    @Max(value = 999)
    @Column(name = "weight")
    private Integer weight;

    @Min(value = 0)
    @Max(value = 999)
    @Column(name = "length")
    private Integer length;

    @Enumerated(EnumType.STRING)
    @Column(name = "diet")
    private Diet diet;

    @NotNull
    @Column(name = "insert_dt", nullable = false)
    private Instant insertDt;

    @NotNull
    @Column(name = "modified_dt", nullable = false)
    private Instant modifiedDt;

    @ManyToOne
    @JsonIgnoreProperties(value = "dinosaurs", allowSetters = true)
    private Era era;

    @ManyToOne
    @JsonIgnoreProperties(value = "dinosaurs", allowSetters = true)
    private Clade clade;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Dinosaur name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getWeight() {
        return weight;
    }

    public Dinosaur weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getLength() {
        return length;
    }

    public Dinosaur length(Integer length) {
        this.length = length;
        return this;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public Diet getDiet() {
        return diet;
    }

    public Dinosaur diet(Diet diet) {
        this.diet = diet;
        return this;
    }

    public void setDiet(Diet diet) {
        this.diet = diet;
    }

    public Instant getInsertDt() {
        return insertDt;
    }

    public Dinosaur insertDt(Instant insertDt) {
        this.insertDt = insertDt;
        return this;
    }

    public void setInsertDt(Instant insertDt) {
        this.insertDt = insertDt;
    }

    public Instant getModifiedDt() {
        return modifiedDt;
    }

    public Dinosaur modifiedDt(Instant modifiedDt) {
        this.modifiedDt = modifiedDt;
        return this;
    }

    public void setModifiedDt(Instant modifiedDt) {
        this.modifiedDt = modifiedDt;
    }

    public Era getEra() {
        return era;
    }

    public Dinosaur era(Era era) {
        this.era = era;
        return this;
    }

    public void setEra(Era era) {
        this.era = era;
    }

    public Clade getClade() {
        return clade;
    }

    public Dinosaur clade(Clade clade) {
        this.clade = clade;
        return this;
    }

    public void setClade(Clade clade) {
        this.clade = clade;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dinosaur)) {
            return false;
        }
        return id != null && id.equals(((Dinosaur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Dinosaur{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", weight=" + getWeight() +
            ", length=" + getLength() +
            ", diet='" + getDiet() + "'" +
            ", insertDt='" + getInsertDt() + "'" +
            ", modifiedDt='" + getModifiedDt() + "'" +
            "}";
    }
}
