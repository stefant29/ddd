package com.dignitas.ddd.domain;

import static com.dignitas.ddd.domain.User1TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.dignitas.ddd.web.rest.TestUtil;
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
}
