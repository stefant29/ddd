package com.dignitas.ddd.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A User1.
 */
@Entity
@Table(name = "user_1")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class User1 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private String id;

    @Column(name = "nume")
    private String nume;

    @Column(name = "prenume")
    private String prenume;

    @Column(name = "cnp")
    private String cnp;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user1")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "user1" }, allowSetters = true)
    private Set<Company> companies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public User1 id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNume() {
        return this.nume;
    }

    public User1 nume(String nume) {
        this.setNume(nume);
        return this;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPrenume() {
        return this.prenume;
    }

    public User1 prenume(String prenume) {
        this.setPrenume(prenume);
        return this;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getCnp() {
        return this.cnp;
    }

    public User1 cnp(String cnp) {
        this.setCnp(cnp);
        return this;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public Set<Company> getCompanies() {
        return this.companies;
    }

    public void setCompanies(Set<Company> companies) {
        if (this.companies != null) {
            this.companies.forEach(i -> i.setUser1(null));
        }
        if (companies != null) {
            companies.forEach(i -> i.setUser1(this));
        }
        this.companies = companies;
    }

    public User1 companies(Set<Company> companies) {
        this.setCompanies(companies);
        return this;
    }

    public User1 addCompany(Company company) {
        this.companies.add(company);
        company.setUser1(this);
        return this;
    }

    public User1 removeCompany(Company company) {
        this.companies.remove(company);
        company.setUser1(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User1)) {
            return false;
        }
        return getId() != null && getId().equals(((User1) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "User1{" +
            "id=" + getId() +
            ", nume='" + getNume() + "'" +
            ", prenume='" + getPrenume() + "'" +
            ", cnp='" + getCnp() + "'" +
            "}";
    }
}
