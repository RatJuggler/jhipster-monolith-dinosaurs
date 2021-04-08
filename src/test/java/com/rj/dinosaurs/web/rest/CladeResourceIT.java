package com.rj.dinosaurs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.rj.dinosaurs.IntegrationTest;
import com.rj.dinosaurs.domain.Clade;
import com.rj.dinosaurs.repository.CladeRepository;
import com.rj.dinosaurs.service.dto.CladeDTO;
import com.rj.dinosaurs.service.mapper.CladeMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CladeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CladeResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/clades";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CladeRepository cladeRepository;

    @Autowired
    private CladeMapper cladeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCladeMockMvc;

    private Clade clade;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clade createEntity(EntityManager em) {
        Clade clade = new Clade().description(DEFAULT_DESCRIPTION);
        return clade;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clade createUpdatedEntity(EntityManager em) {
        Clade clade = new Clade().description(UPDATED_DESCRIPTION);
        return clade;
    }

    @BeforeEach
    public void initTest() {
        clade = createEntity(em);
    }

    @Test
    @Transactional
    void createClade() throws Exception {
        int databaseSizeBeforeCreate = cladeRepository.findAll().size();
        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);
        restCladeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isCreated());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeCreate + 1);
        Clade testClade = cladeList.get(cladeList.size() - 1);
        assertThat(testClade.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createCladeWithExistingId() throws Exception {
        // Create the Clade with an existing ID
        clade.setId(1L);
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        int databaseSizeBeforeCreate = cladeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCladeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cladeRepository.findAll().size();
        // set the field null
        clade.setDescription(null);

        // Create the Clade, which fails.
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        restCladeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isBadRequest());

        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllClades() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        // Get all the cladeList
        restCladeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clade.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getClade() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        // Get the clade
        restCladeMockMvc
            .perform(get(ENTITY_API_URL_ID, clade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clade.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingClade() throws Exception {
        // Get the clade
        restCladeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewClade() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();

        // Update the clade
        Clade updatedClade = cladeRepository.findById(clade.getId()).get();
        // Disconnect from session so that the updates on updatedClade are not directly saved in db
        em.detach(updatedClade);
        updatedClade.description(UPDATED_DESCRIPTION);
        CladeDTO cladeDTO = cladeMapper.toDto(updatedClade);

        restCladeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cladeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cladeDTO))
            )
            .andExpect(status().isOk());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
        Clade testClade = cladeList.get(cladeList.size() - 1);
        assertThat(testClade.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingClade() throws Exception {
        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();
        clade.setId(count.incrementAndGet());

        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCladeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cladeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cladeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchClade() throws Exception {
        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();
        clade.setId(count.incrementAndGet());

        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCladeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cladeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamClade() throws Exception {
        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();
        clade.setId(count.incrementAndGet());

        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCladeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCladeWithPatch() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();

        // Update the clade using partial update
        Clade partialUpdatedClade = new Clade();
        partialUpdatedClade.setId(clade.getId());

        partialUpdatedClade.description(UPDATED_DESCRIPTION);

        restCladeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClade.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClade))
            )
            .andExpect(status().isOk());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
        Clade testClade = cladeList.get(cladeList.size() - 1);
        assertThat(testClade.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateCladeWithPatch() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();

        // Update the clade using partial update
        Clade partialUpdatedClade = new Clade();
        partialUpdatedClade.setId(clade.getId());

        partialUpdatedClade.description(UPDATED_DESCRIPTION);

        restCladeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClade.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClade))
            )
            .andExpect(status().isOk());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
        Clade testClade = cladeList.get(cladeList.size() - 1);
        assertThat(testClade.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingClade() throws Exception {
        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();
        clade.setId(count.incrementAndGet());

        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCladeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cladeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cladeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchClade() throws Exception {
        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();
        clade.setId(count.incrementAndGet());

        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCladeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cladeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamClade() throws Exception {
        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();
        clade.setId(count.incrementAndGet());

        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCladeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteClade() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        int databaseSizeBeforeDelete = cladeRepository.findAll().size();

        // Delete the clade
        restCladeMockMvc
            .perform(delete(ENTITY_API_URL_ID, clade.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
