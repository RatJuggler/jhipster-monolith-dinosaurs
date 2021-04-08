package com.rj.dinosaurs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.rj.dinosaurs.IntegrationTest;
import com.rj.dinosaurs.domain.Era;
import com.rj.dinosaurs.repository.EraRepository;
import com.rj.dinosaurs.service.dto.EraDTO;
import com.rj.dinosaurs.service.mapper.EraMapper;
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
 * Integration tests for the {@link EraResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EraResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_FROM_MA = 0;
    private static final Integer UPDATED_FROM_MA = 1;

    private static final Integer DEFAULT_TO_MA = 0;
    private static final Integer UPDATED_TO_MA = 1;

    private static final String ENTITY_API_URL = "/api/eras";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EraRepository eraRepository;

    @Autowired
    private EraMapper eraMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEraMockMvc;

    private Era era;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Era createEntity(EntityManager em) {
        Era era = new Era().name(DEFAULT_NAME).fromMa(DEFAULT_FROM_MA).toMa(DEFAULT_TO_MA);
        return era;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Era createUpdatedEntity(EntityManager em) {
        Era era = new Era().name(UPDATED_NAME).fromMa(UPDATED_FROM_MA).toMa(UPDATED_TO_MA);
        return era;
    }

    @BeforeEach
    public void initTest() {
        era = createEntity(em);
    }

    @Test
    @Transactional
    void createEra() throws Exception {
        int databaseSizeBeforeCreate = eraRepository.findAll().size();
        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);
        restEraMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eraDTO)))
            .andExpect(status().isCreated());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeCreate + 1);
        Era testEra = eraList.get(eraList.size() - 1);
        assertThat(testEra.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEra.getFromMa()).isEqualTo(DEFAULT_FROM_MA);
        assertThat(testEra.getToMa()).isEqualTo(DEFAULT_TO_MA);
    }

    @Test
    @Transactional
    void createEraWithExistingId() throws Exception {
        // Create the Era with an existing ID
        era.setId(1L);
        EraDTO eraDTO = eraMapper.toDto(era);

        int databaseSizeBeforeCreate = eraRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEraMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eraDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = eraRepository.findAll().size();
        // set the field null
        era.setName(null);

        // Create the Era, which fails.
        EraDTO eraDTO = eraMapper.toDto(era);

        restEraMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eraDTO)))
            .andExpect(status().isBadRequest());

        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEras() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        // Get all the eraList
        restEraMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(era.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].fromMa").value(hasItem(DEFAULT_FROM_MA)))
            .andExpect(jsonPath("$.[*].toMa").value(hasItem(DEFAULT_TO_MA)));
    }

    @Test
    @Transactional
    void getEra() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        // Get the era
        restEraMockMvc
            .perform(get(ENTITY_API_URL_ID, era.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(era.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.fromMa").value(DEFAULT_FROM_MA))
            .andExpect(jsonPath("$.toMa").value(DEFAULT_TO_MA));
    }

    @Test
    @Transactional
    void getNonExistingEra() throws Exception {
        // Get the era
        restEraMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEra() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        int databaseSizeBeforeUpdate = eraRepository.findAll().size();

        // Update the era
        Era updatedEra = eraRepository.findById(era.getId()).get();
        // Disconnect from session so that the updates on updatedEra are not directly saved in db
        em.detach(updatedEra);
        updatedEra.name(UPDATED_NAME).fromMa(UPDATED_FROM_MA).toMa(UPDATED_TO_MA);
        EraDTO eraDTO = eraMapper.toDto(updatedEra);

        restEraMockMvc
            .perform(
                put(ENTITY_API_URL_ID, eraDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eraDTO))
            )
            .andExpect(status().isOk());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
        Era testEra = eraList.get(eraList.size() - 1);
        assertThat(testEra.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEra.getFromMa()).isEqualTo(UPDATED_FROM_MA);
        assertThat(testEra.getToMa()).isEqualTo(UPDATED_TO_MA);
    }

    @Test
    @Transactional
    void putNonExistingEra() throws Exception {
        int databaseSizeBeforeUpdate = eraRepository.findAll().size();
        era.setId(count.incrementAndGet());

        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEraMockMvc
            .perform(
                put(ENTITY_API_URL_ID, eraDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eraDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEra() throws Exception {
        int databaseSizeBeforeUpdate = eraRepository.findAll().size();
        era.setId(count.incrementAndGet());

        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEraMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eraDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEra() throws Exception {
        int databaseSizeBeforeUpdate = eraRepository.findAll().size();
        era.setId(count.incrementAndGet());

        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEraMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eraDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEraWithPatch() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        int databaseSizeBeforeUpdate = eraRepository.findAll().size();

        // Update the era using partial update
        Era partialUpdatedEra = new Era();
        partialUpdatedEra.setId(era.getId());

        partialUpdatedEra.fromMa(UPDATED_FROM_MA).toMa(UPDATED_TO_MA);

        restEraMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEra.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEra))
            )
            .andExpect(status().isOk());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
        Era testEra = eraList.get(eraList.size() - 1);
        assertThat(testEra.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEra.getFromMa()).isEqualTo(UPDATED_FROM_MA);
        assertThat(testEra.getToMa()).isEqualTo(UPDATED_TO_MA);
    }

    @Test
    @Transactional
    void fullUpdateEraWithPatch() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        int databaseSizeBeforeUpdate = eraRepository.findAll().size();

        // Update the era using partial update
        Era partialUpdatedEra = new Era();
        partialUpdatedEra.setId(era.getId());

        partialUpdatedEra.name(UPDATED_NAME).fromMa(UPDATED_FROM_MA).toMa(UPDATED_TO_MA);

        restEraMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEra.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEra))
            )
            .andExpect(status().isOk());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
        Era testEra = eraList.get(eraList.size() - 1);
        assertThat(testEra.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEra.getFromMa()).isEqualTo(UPDATED_FROM_MA);
        assertThat(testEra.getToMa()).isEqualTo(UPDATED_TO_MA);
    }

    @Test
    @Transactional
    void patchNonExistingEra() throws Exception {
        int databaseSizeBeforeUpdate = eraRepository.findAll().size();
        era.setId(count.incrementAndGet());

        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEraMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, eraDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(eraDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEra() throws Exception {
        int databaseSizeBeforeUpdate = eraRepository.findAll().size();
        era.setId(count.incrementAndGet());

        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEraMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(eraDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEra() throws Exception {
        int databaseSizeBeforeUpdate = eraRepository.findAll().size();
        era.setId(count.incrementAndGet());

        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEraMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(eraDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEra() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        int databaseSizeBeforeDelete = eraRepository.findAll().size();

        // Delete the era
        restEraMockMvc.perform(delete(ENTITY_API_URL_ID, era.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
