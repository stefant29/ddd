package com.dignitas.ddd.domain;

import static com.dignitas.ddd.domain.CompanyTestSamples.*;
import static com.dignitas.ddd.domain.User1TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.dignitas.ddd.web.rest.TestUtil;
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

        company.setUser1(user1Back);
        assertThat(company.getUser1()).isEqualTo(user1Back);

        company.user1(null);
        assertThat(company.getUser1()).isNull();
    }
}
