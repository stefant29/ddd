package com.dignitas.ddd.domain;

import java.util.UUID;

public class User1TestSamples {

    public static User1 getUser1Sample1() {
        return new User1().id("id1").nume("nume1").prenume("prenume1").cnp("cnp1");
    }

    public static User1 getUser1Sample2() {
        return new User1().id("id2").nume("nume2").prenume("prenume2").cnp("cnp2");
    }

    public static User1 getUser1RandomSampleGenerator() {
        return new User1()
            .id(UUID.randomUUID().toString())
            .nume(UUID.randomUUID().toString())
            .prenume(UUID.randomUUID().toString())
            .cnp(UUID.randomUUID().toString());
    }
}
