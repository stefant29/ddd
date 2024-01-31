package com.dignitas.ddd.web.rest;

import com.dignitas.ddd.domain.UserType;
import com.dignitas.ddd.repository.UserTypeRepository;
import com.dignitas.ddd.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.dignitas.ddd.domain.UserType}.
 */
@RestController
@RequestMapping("/api/user-types")
@Transactional
public class UserTypeResource {

    private final Logger log = LoggerFactory.getLogger(UserTypeResource.class);

    private static final String ENTITY_NAME = "userType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserTypeRepository userTypeRepository;

    public UserTypeResource(UserTypeRepository userTypeRepository) {
        this.userTypeRepository = userTypeRepository;
    }

    /**
     * {@code POST  /user-types} : Create a new userType.
     *
     * @param userType the userType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userType, or with status {@code 400 (Bad Request)} if the userType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<UserType> createUserType(@RequestBody UserType userType) throws URISyntaxException {
        log.debug("REST request to save UserType : {}", userType);
        if (userType.getId() != null) {
            throw new BadRequestAlertException("A new userType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserType result = userTypeRepository.save(userType);
        return ResponseEntity
            .created(new URI("/api/user-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /user-types/:id} : Updates an existing userType.
     *
     * @param id the id of the userType to save.
     * @param userType the userType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userType,
     * or with status {@code 400 (Bad Request)} if the userType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserType> updateUserType(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody UserType userType
    ) throws URISyntaxException {
        log.debug("REST request to update UserType : {}, {}", id, userType);
        if (userType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserType result = userTypeRepository.save(userType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userType.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /user-types/:id} : Partial updates given fields of an existing userType, field will ignore if it is null
     *
     * @param id the id of the userType to save.
     * @param userType the userType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userType,
     * or with status {@code 400 (Bad Request)} if the userType is not valid,
     * or with status {@code 404 (Not Found)} if the userType is not found,
     * or with status {@code 500 (Internal Server Error)} if the userType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserType> partialUpdateUserType(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody UserType userType
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserType partially : {}, {}", id, userType);
        if (userType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserType> result = userTypeRepository
            .findById(userType.getId())
            .map(existingUserType -> {
                if (userType.getType() != null) {
                    existingUserType.setType(userType.getType());
                }

                return existingUserType;
            })
            .map(userTypeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userType.getId())
        );
    }

    /**
     * {@code GET  /user-types} : get all the userTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userTypes in body.
     */
    @GetMapping("")
    public List<UserType> getAllUserTypes() {
        log.debug("REST request to get all UserTypes");
        return userTypeRepository.findAll();
    }

    /**
     * {@code GET  /user-types/:id} : get the "id" userType.
     *
     * @param id the id of the userType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserType> getUserType(@PathVariable("id") String id) {
        log.debug("REST request to get UserType : {}", id);
        Optional<UserType> userType = userTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userType);
    }

    /**
     * {@code DELETE  /user-types/:id} : delete the "id" userType.
     *
     * @param id the id of the userType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserType(@PathVariable("id") String id) {
        log.debug("REST request to delete UserType : {}", id);
        userTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
