package com.dignitas.ddd.domain;

import java.util.UUID;

public class UserTypeTestSamples {

    public static UserType getUserTypeSample1() {
        return new UserType().id("id1").type("type1");
    }

    public static UserType getUserTypeSample2() {
        return new UserType().id("id2").type("type2");
    }

    public static UserType getUserTypeRandomSampleGenerator() {
        return new UserType().id(UUID.randomUUID().toString()).type(UUID.randomUUID().toString());
    }
}
