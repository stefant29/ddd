package com.dignitas.ddd.repository;

import com.dignitas.ddd.domain.A;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the A entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ARepository extends JpaRepository<A, String> {}
