package com.dignitas.ddd.domain;

import static com.dignitas.ddd.domain.ClientTestSamples.*;
import static com.dignitas.ddd.domain.CompanyTestSamples.*;
import static com.dignitas.ddd.domain.User1TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.dignitas.ddd.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CompanyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Company.class);
        Company company1 = getCompanySample1();
        Company company2 = new Company();
        assertThat(company1).isNotEqualTo(company2);

        company2.setId(company1.getId());
        assertThat(company1).isEqualTo(company2);

        company2 = getCompanySample2();
        assertThat(company1).isNotEqualTo(company2);
    }

    @Test
    void userTest() throws Exception {
        Company company = getCompanyRandomSampleGenerator();
        User1 user1Back = getUser1RandomSampleGenerator();

        company.addUser(user1Back);
        assertThat(company.getUsers()).containsOnly(user1Back);
        assertThat(user1Back.getCompany()).isEqualTo(company);

        company.removeUser(user1Back);
        assertThat(company.getUsers()).doesNotContain(user1Back);
        assertThat(user1Back.getCompany()).isNull();

        company.users(new HashSet<>(Set.of(user1Back)));
        assertThat(company.getUsers()).containsOnly(user1Back);
        assertThat(user1Back.getCompany()).isEqualTo(company);

        company.setUsers(new HashSet<>());
        assertThat(company.getUsers()).doesNotContain(user1Back);
        assertThat(user1Back.getCompany()).isNull();
    }

    @Test
    void clientTest() throws Exception {
        Company company = getCompanyRandomSampleGenerator();
        Client clientBack = getClientRandomSampleGenerator();

        company.addClient(clientBack);
        assertThat(company.getClients()).containsOnly(clientBack);
        assertThat(clientBack.getCompany()).isEqualTo(company);

        company.removeClient(clientBack);
        assertThat(company.getClients()).doesNotContain(clientBack);
        assertThat(clientBack.getCompany()).isNull();

        company.clients(new HashSet<>(Set.of(clientBack)));
        assertThat(company.getClients()).containsOnly(clientBack);
        assertThat(clientBack.getCompany()).isEqualTo(company);

        company.setClients(new HashSet<>());
        assertThat(company.getClients()).doesNotContain(clientBack);
        assertThat(clientBack.getCompany()).isNull();
    }
}
