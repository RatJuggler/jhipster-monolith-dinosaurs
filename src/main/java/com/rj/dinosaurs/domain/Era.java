package com.rj.dinosaurs.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Era.
 */
@Entity
@Table(name = "era")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Era implements Serializable {

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
    @Column(name = "from_ma")
    private Integer fromMa;

    @Min(value = 0)
    @Max(value = 999)
    @Column(name = "to_ma")
    private Integer toMa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Era id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public Era name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getFromMa() {
        return this.fromMa;
    }

    public Era fromMa(Integer fromMa) {
        this.fromMa = fromMa;
        return this;
    }

    public void setFromMa(Integer fromMa) {
        this.fromMa = fromMa;
    }

    public Integer getToMa() {
        return this.toMa;
    }

    public Era toMa(Integer toMa) {
        this.toMa = toMa;
        return this;
    }

    public void setToMa(Integer toMa) {
        this.toMa = toMa;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Era)) {
            return false;
        }
        return id != null && id.equals(((Era) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Era{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fromMa=" + getFromMa() +
            ", toMa=" + getToMa() +
            "}";
    }
}
