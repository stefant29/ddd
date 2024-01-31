package com.dignitas.ddd.domain;

import java.util.UUID;

public class ClientTestSamples {

    public static Client getClientSample1() {
        return new Client().id("id1").name("name1");
    }

    public static Client getClientSample2() {
        return new Client().id("id2").name("name2");
    }

    public static Client getClientRandomSampleGenerator() {
        return new Client().id(UUID.randomUUID().toString()).name(UUID.randomUUID().toString());
    }
}
