package com.dignitas.ddd.domain;

import static com.dignitas.ddd.domain.ClientTestSamples.*;
import static com.dignitas.ddd.domain.CompanyTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.dignitas.ddd.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ClientTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Client.class);
        Client client1 = getClientSample1();
        Client client2 = new Client();
        assertThat(client1).isNotEqualTo(client2);

        client2.setId(client1.getId());
        assertThat(client1).isEqualTo(client2);

        client2 = getClientSample2();
        assertThat(client1).isNotEqualTo(client2);
    }

    @Test
    void companyTest() throws Exception {
        Client client = getClientRandomSampleGenerator();
        Company companyBack = getCompanyRandomSampleGenerator();

        client.setCompany(companyBack);
        assertThat(client.getCompany()).isEqualTo(companyBack);

        client.company(null);
        assertThat(client.getCompany()).isNull();
    }
}
