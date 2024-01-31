package com.dignitas.ddd.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.dignitas.ddd.IntegrationTest;
import com.dignitas.ddd.domain.User1;
import com.dignitas.ddd.repository.User1Repository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link User1Resource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class User1ResourceIT {

    private static final String DEFAULT_NUME = "AAAAAAAAAA";
    private static final String UPDATED_NUME = "BBBBBBBBBB";

    private static final String DEFAULT_PRENUME = "AAAAAAAAAA";
    private static final String UPDATED_PRENUME = "BBBBBBBBBB";

    private static final String DEFAULT_CNP = "AAAAAAAAAA";
    private static final String UPDATED_CNP = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/user-1-s";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private User1Repository user1Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUser1MockMvc;

    private User1 user1;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static User1 createEntity(EntityManager em) {
        User1 user1 = new User1().nume(DEFAULT_NUME).prenume(DEFAULT_PRENUME).cnp(DEFAULT_CNP);
        return user1;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static User1 createUpdatedEntity(EntityManager em) {
        User1 user1 = new User1().nume(UPDATED_NUME).prenume(UPDATED_PRENUME).cnp(UPDATED_CNP);
        return user1;
    }

    @BeforeEach
    public void initTest() {
        user1 = createEntity(em);
    }

    @Test
    @Transactional
    void createUser1() throws Exception {
        int databaseSizeBeforeCreate = user1Repository.findAll().size();
        // Create the User1
        restUser1MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isCreated());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeCreate + 1);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getNume()).isEqualTo(DEFAULT_NUME);
        assertThat(testUser1.getPrenume()).isEqualTo(DEFAULT_PRENUME);
        assertThat(testUser1.getCnp()).isEqualTo(DEFAULT_CNP);
    }

    @Test
    @Transactional
    void createUser1WithExistingId() throws Exception {
        // Create the User1 with an existing ID
        user1.setId("existing_id");

        int databaseSizeBeforeCreate = user1Repository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUser1MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUser1s() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        // Get all the user1List
        restUser1MockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(user1.getId())))
            .andExpect(jsonPath("$.[*].nume").value(hasItem(DEFAULT_NUME)))
            .andExpect(jsonPath("$.[*].prenume").value(hasItem(DEFAULT_PRENUME)))
            .andExpect(jsonPath("$.[*].cnp").value(hasItem(DEFAULT_CNP)));
    }

    @Test
    @Transactional
    void getUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        // Get the user1
        restUser1MockMvc
            .perform(get(ENTITY_API_URL_ID, user1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(user1.getId()))
            .andExpect(jsonPath("$.nume").value(DEFAULT_NUME))
            .andExpect(jsonPath("$.prenume").value(DEFAULT_PRENUME))
            .andExpect(jsonPath("$.cnp").value(DEFAULT_CNP));
    }

    @Test
    @Transactional
    void getNonExistingUser1() throws Exception {
        // Get the user1
        restUser1MockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // Update the user1
        User1 updatedUser1 = user1Repository.findById(user1.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedUser1 are not directly saved in db
        em.detach(updatedUser1);
        updatedUser1.nume(UPDATED_NUME).prenume(UPDATED_PRENUME).cnp(UPDATED_CNP);

        restUser1MockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUser1.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUser1))
            )
            .andExpect(status().isOk());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testUser1.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testUser1.getCnp()).isEqualTo(UPDATED_CNP);
    }

    @Test
    @Transactional
    void putNonExistingUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();
        user1.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUser1MockMvc
            .perform(
                put(ENTITY_API_URL_ID, user1.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(user1))
            )
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();
        user1.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUser1MockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(user1))
            )
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();
        user1.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUser1MockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUser1WithPatch() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // Update the user1 using partial update
        User1 partialUpdatedUser1 = new User1();
        partialUpdatedUser1.setId(user1.getId());

        partialUpdatedUser1.nume(UPDATED_NUME).prenume(UPDATED_PRENUME).cnp(UPDATED_CNP);

        restUser1MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUser1.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUser1))
            )
            .andExpect(status().isOk());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testUser1.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testUser1.getCnp()).isEqualTo(UPDATED_CNP);
    }

    @Test
    @Transactional
    void fullUpdateUser1WithPatch() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // Update the user1 using partial update
        User1 partialUpdatedUser1 = new User1();
        partialUpdatedUser1.setId(user1.getId());

        partialUpdatedUser1.nume(UPDATED_NUME).prenume(UPDATED_PRENUME).cnp(UPDATED_CNP);

        restUser1MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUser1.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUser1))
            )
            .andExpect(status().isOk());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testUser1.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testUser1.getCnp()).isEqualTo(UPDATED_CNP);
    }

    @Test
    @Transactional
    void patchNonExistingUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();
        user1.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUser1MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, user1.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(user1))
            )
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();
        user1.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUser1MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(user1))
            )
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();
        user1.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUser1MockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        int databaseSizeBeforeDelete = user1Repository.findAll().size();

        // Delete the user1
        restUser1MockMvc
            .perform(delete(ENTITY_API_URL_ID, user1.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
