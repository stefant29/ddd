package com.dignitas.ddd.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "userType", "company" }, allowSetters = true)
    private Set<User1> users = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "company" }, allowSetters = true)
    private Set<Client> clients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Company id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Company name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User1> getUsers() {
        return this.users;
    }

    public void setUsers(Set<User1> user1s) {
        if (this.users != null) {
            this.users.forEach(i -> i.setCompany(null));
        }
        if (user1s != null) {
            user1s.forEach(i -> i.setCompany(this));
        }
        this.users = user1s;
    }

    public Company users(Set<User1> user1s) {
        this.setUsers(user1s);
        return this;
    }

    public Company addUser(User1 user1) {
        this.users.add(user1);
        user1.setCompany(this);
        return this;
    }

    public Company removeUser(User1 user1) {
        this.users.remove(user1);
        user1.setCompany(null);
        return this;
    }

    public Set<Client> getClients() {
        return this.clients;
    }

    public void setClients(Set<Client> clients) {
        if (this.clients != null) {
            this.clients.forEach(i -> i.setCompany(null));
        }
        if (clients != null) {
            clients.forEach(i -> i.setCompany(this));
        }
        this.clients = clients;
    }

    public Company clients(Set<Client> clients) {
        this.setClients(clients);
        return this;
    }

    public Company addClient(Client client) {
        this.clients.add(client);
        client.setCompany(this);
        return this;
    }

    public Company removeClient(Client client) {
        this.clients.remove(client);
        client.setCompany(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return getId() != null && getId().equals(((Company) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
