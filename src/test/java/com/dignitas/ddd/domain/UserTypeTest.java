package com.dignitas.ddd.domain;

import static com.dignitas.ddd.domain.User1TestSamples.*;
import static com.dignitas.ddd.domain.UserTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.dignitas.ddd.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
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
    void userTest() throws Exception {
        UserType userType = getUserTypeRandomSampleGenerator();
        User1 user1Back = getUser1RandomSampleGenerator();

        userType.addUser(user1Back);
        assertThat(userType.getUsers()).containsOnly(user1Back);
        assertThat(user1Back.getUserType()).isEqualTo(userType);

        userType.removeUser(user1Back);
        assertThat(userType.getUsers()).doesNotContain(user1Back);
        assertThat(user1Back.getUserType()).isNull();

        userType.users(new HashSet<>(Set.of(user1Back)));
        assertThat(userType.getUsers()).containsOnly(user1Back);
        assertThat(user1Back.getUserType()).isEqualTo(userType);

        userType.setUsers(new HashSet<>());
        assertThat(userType.getUsers()).doesNotContain(user1Back);
        assertThat(user1Back.getUserType()).isNull();
    }
}
