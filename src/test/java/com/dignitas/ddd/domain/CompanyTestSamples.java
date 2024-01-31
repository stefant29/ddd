package com.dignitas.ddd.domain;

import java.util.UUID;

public class CompanyTestSamples {

    public static Company getCompanySample1() {
        return new Company().id("id1").name("name1");
    }

    public static Company getCompanySample2() {
        return new Company().id("id2").name("name2");
    }

    public static Company getCompanyRandomSampleGenerator() {
        return new Company().id(UUID.randomUUID().toString()).name(UUID.randomUUID().toString());
    }
}
