package com.dignitas.ddd.domain;

import static com.dignitas.ddd.domain.CompanyTestSamples.*;
import static com.dignitas.ddd.domain.User1TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.dignitas.ddd.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class User1Test {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(User1.class);
        User1 user11 = getUser1Sample1();
        User1 user12 = new User1();
        assertThat(user11).isNotEqualTo(user12);

        user12.setId(user11.getId());
        assertThat(user11).isEqualTo(user12);

        user12 = getUser1Sample2();
        assertThat(user11).isNotEqualTo(user12);
    }

    @Test
    void companyTest() throws Exception {
        User1 user1 = getUser1RandomSampleGenerator();
        Company companyBack = getCompanyRandomSampleGenerator();

        user1.addCompany(companyBack);
        assertThat(user1.getCompanies()).containsOnly(companyBack);
        assertThat(companyBack.getUser1()).isEqualTo(user1);

        user1.removeCompany(companyBack);
        assertThat(user1.getCompanies()).doesNotContain(companyBack);
        assertThat(companyBack.getUser1()).isNull();

        user1.companies(new HashSet<>(Set.of(companyBack)));
        assertThat(user1.getCompanies()).containsOnly(companyBack);
        assertThat(companyBack.getUser1()).isEqualTo(user1);

        user1.setCompanies(new HashSet<>());
        assertThat(user1.getCompanies()).doesNotContain(companyBack);
        assertThat(companyBack.getUser1()).isNull();
    }
}
