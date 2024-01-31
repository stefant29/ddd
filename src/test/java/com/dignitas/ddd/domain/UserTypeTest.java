package com.dignitas.ddd.domain;

import static com.dignitas.ddd.domain.User1TestSamples.*;
import static com.dignitas.ddd.domain.UserTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.dignitas.ddd.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserType.class);
        UserType userType1 = getUserTypeSample1();
        UserType userType2 = new UserType();
        assertThat(userType1).isNotEqualTo(userType2);

        userType2.setId(userType1.getId());
        assertThat(userType1).isEqualTo(userType2);

        userType2 = getUserTypeSample2();
        assertThat(userType1).isNotEqualTo(userType2);
    }

    @Test
    void user1Test() throws Exception {
        UserType userType = getUserTypeRandomSampleGenerator();
        User1 user1Back = getUser1RandomSampleGenerator();

        userType.setUser1(user1Back);
        assertThat(userType.getUser1()).isEqualTo(user1Back);

        userType.user1(null);
        assertThat(userType.getUser1()).isNull();
    }
}
