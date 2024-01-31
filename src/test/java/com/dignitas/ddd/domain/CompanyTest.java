package com.dignitas.ddd.domain;

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
    void user1Test() throws Exception {
        Company company = getCompanyRandomSampleGenerator();
        User1 user1Back = getUser1RandomSampleGenerator();

        company.addUser1(user1Back);
        assertThat(company.getUser1s()).containsOnly(user1Back);
        assertThat(user1Back.getCompany()).isEqualTo(company);

        company.removeUser1(user1Back);
        assertThat(company.getUser1s()).doesNotContain(user1Back);
        assertThat(user1Back.getCompany()).isNull();

        company.user1s(new HashSet<>(Set.of(user1Back)));
        assertThat(company.getUser1s()).containsOnly(user1Back);
        assertThat(user1Back.getCompany()).isEqualTo(company);

        company.setUser1s(new HashSet<>());
        assertThat(company.getUser1s()).doesNotContain(user1Back);
        assertThat(user1Back.getCompany()).isNull();
    }
}
