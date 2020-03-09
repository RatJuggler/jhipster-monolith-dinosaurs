package com.rj.dinosaurs.web.rest;

import com.rj.dinosaurs.DinosaursApp;
import com.rj.dinosaurs.domain.Dinosaur;
import com.rj.dinosaurs.repository.DinosaurRepository;
import com.rj.dinosaurs.service.DinosaurService;
import com.rj.dinosaurs.service.dto.DinosaurDTO;
import com.rj.dinosaurs.service.mapper.DinosaurMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.rj.dinosaurs.domain.enumeration.Diet;
/**
 * Integration tests for the {@link DinosaurResource} REST controller.
 */
@SpringBootTest(classes = DinosaursApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DinosaurResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_WEIGHT = 0;
    private static final Integer UPDATED_WEIGHT = 1;

    private static final Integer DEFAULT_LENGTH = 0;
    private static final Integer UPDATED_LENGTH = 1;

    private static final Diet DEFAULT_DIET = Diet.HERBIVORE;
    private static final Diet UPDATED_DIET = Diet.CARNIVORE;

    private static final Instant DEFAULT_INSERT_DT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INSERT_DT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MODIFIED_DT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED_DT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DinosaurRepository dinosaurRepository;

    @Autowired
    private DinosaurMapper dinosaurMapper;

    @Autowired
    private DinosaurService dinosaurService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDinosaurMockMvc;

    private Dinosaur dinosaur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dinosaur createEntity(EntityManager em) {
        Dinosaur dinosaur = new Dinosaur()
            .name(DEFAULT_NAME)
            .weight(DEFAULT_WEIGHT)
            .length(DEFAULT_LENGTH)
            .diet(DEFAULT_DIET)
            .insertDt(DEFAULT_INSERT_DT)
            .modifiedDt(DEFAULT_MODIFIED_DT);
        return dinosaur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dinosaur createUpdatedEntity(EntityManager em) {
        Dinosaur dinosaur = new Dinosaur()
            .name(UPDATED_NAME)
            .weight(UPDATED_WEIGHT)
            .length(UPDATED_LENGTH)
            .diet(UPDATED_DIET)
            .insertDt(UPDATED_INSERT_DT)
            .modifiedDt(UPDATED_MODIFIED_DT);
        return dinosaur;
    }

    @BeforeEach
    public void initTest() {
        dinosaur = createEntity(em);
    }

    @Test
    @Transactional
    public void createDinosaur() throws Exception {
        int databaseSizeBeforeCreate = dinosaurRepository.findAll().size();

        // Create the Dinosaur
        DinosaurDTO dinosaurDTO = dinosaurMapper.toDto(dinosaur);
        restDinosaurMockMvc.perform(post("/api/dinosaurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dinosaurDTO)))
            .andExpect(status().isCreated());

        // Validate the Dinosaur in the database
        List<Dinosaur> dinosaurList = dinosaurRepository.findAll();
        assertThat(dinosaurList).hasSize(databaseSizeBeforeCreate + 1);
        Dinosaur testDinosaur = dinosaurList.get(dinosaurList.size() - 1);
        assertThat(testDinosaur.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDinosaur.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testDinosaur.getLength()).isEqualTo(DEFAULT_LENGTH);
        assertThat(testDinosaur.getDiet()).isEqualTo(DEFAULT_DIET);
        assertThat(testDinosaur.getInsertDt()).isEqualTo(DEFAULT_INSERT_DT);
        assertThat(testDinosaur.getModifiedDt()).isEqualTo(DEFAULT_MODIFIED_DT);
    }

    @Test
    @Transactional
    public void createDinosaurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dinosaurRepository.findAll().size();

        // Create the Dinosaur with an existing ID
        dinosaur.setId(1L);
        DinosaurDTO dinosaurDTO = dinosaurMapper.toDto(dinosaur);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDinosaurMockMvc.perform(post("/api/dinosaurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dinosaurDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Dinosaur in the database
        List<Dinosaur> dinosaurList = dinosaurRepository.findAll();
        assertThat(dinosaurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = dinosaurRepository.findAll().size();
        // set the field null
        dinosaur.setName(null);

        // Create the Dinosaur, which fails.
        DinosaurDTO dinosaurDTO = dinosaurMapper.toDto(dinosaur);

        restDinosaurMockMvc.perform(post("/api/dinosaurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dinosaurDTO)))
            .andExpect(status().isBadRequest());

        List<Dinosaur> dinosaurList = dinosaurRepository.findAll();
        assertThat(dinosaurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInsertDtIsRequired() throws Exception {
        int databaseSizeBeforeTest = dinosaurRepository.findAll().size();
        // set the field null
        dinosaur.setInsertDt(null);

        // Create the Dinosaur, which fails.
        DinosaurDTO dinosaurDTO = dinosaurMapper.toDto(dinosaur);

        restDinosaurMockMvc.perform(post("/api/dinosaurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dinosaurDTO)))
            .andExpect(status().isBadRequest());

        List<Dinosaur> dinosaurList = dinosaurRepository.findAll();
        assertThat(dinosaurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkModifiedDtIsRequired() throws Exception {
        int databaseSizeBeforeTest = dinosaurRepository.findAll().size();
        // set the field null
        dinosaur.setModifiedDt(null);

        // Create the Dinosaur, which fails.
        DinosaurDTO dinosaurDTO = dinosaurMapper.toDto(dinosaur);

        restDinosaurMockMvc.perform(post("/api/dinosaurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dinosaurDTO)))
            .andExpect(status().isBadRequest());

        List<Dinosaur> dinosaurList = dinosaurRepository.findAll();
        assertThat(dinosaurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDinosaurs() throws Exception {
        // Initialize the database
        dinosaurRepository.saveAndFlush(dinosaur);

        // Get all the dinosaurList
        restDinosaurMockMvc.perform(get("/api/dinosaurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dinosaur.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].length").value(hasItem(DEFAULT_LENGTH)))
            .andExpect(jsonPath("$.[*].diet").value(hasItem(DEFAULT_DIET.toString())))
            .andExpect(jsonPath("$.[*].insertDt").value(hasItem(DEFAULT_INSERT_DT.toString())))
            .andExpect(jsonPath("$.[*].modifiedDt").value(hasItem(DEFAULT_MODIFIED_DT.toString())));
    }
    
    @Test
    @Transactional
    public void getDinosaur() throws Exception {
        // Initialize the database
        dinosaurRepository.saveAndFlush(dinosaur);

        // Get the dinosaur
        restDinosaurMockMvc.perform(get("/api/dinosaurs/{id}", dinosaur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dinosaur.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT))
            .andExpect(jsonPath("$.length").value(DEFAULT_LENGTH))
            .andExpect(jsonPath("$.diet").value(DEFAULT_DIET.toString()))
            .andExpect(jsonPath("$.insertDt").value(DEFAULT_INSERT_DT.toString()))
            .andExpect(jsonPath("$.modifiedDt").value(DEFAULT_MODIFIED_DT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDinosaur() throws Exception {
        // Get the dinosaur
        restDinosaurMockMvc.perform(get("/api/dinosaurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDinosaur() throws Exception {
        // Initialize the database
        dinosaurRepository.saveAndFlush(dinosaur);

        int databaseSizeBeforeUpdate = dinosaurRepository.findAll().size();

        // Update the dinosaur
        Dinosaur updatedDinosaur = dinosaurRepository.findById(dinosaur.getId()).get();
        // Disconnect from session so that the updates on updatedDinosaur are not directly saved in db
        em.detach(updatedDinosaur);
        updatedDinosaur
            .name(UPDATED_NAME)
            .weight(UPDATED_WEIGHT)
            .length(UPDATED_LENGTH)
            .diet(UPDATED_DIET)
            .insertDt(UPDATED_INSERT_DT)
            .modifiedDt(UPDATED_MODIFIED_DT);
        DinosaurDTO dinosaurDTO = dinosaurMapper.toDto(updatedDinosaur);

        restDinosaurMockMvc.perform(put("/api/dinosaurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dinosaurDTO)))
            .andExpect(status().isOk());

        // Validate the Dinosaur in the database
        List<Dinosaur> dinosaurList = dinosaurRepository.findAll();
        assertThat(dinosaurList).hasSize(databaseSizeBeforeUpdate);
        Dinosaur testDinosaur = dinosaurList.get(dinosaurList.size() - 1);
        assertThat(testDinosaur.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDinosaur.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testDinosaur.getLength()).isEqualTo(UPDATED_LENGTH);
        assertThat(testDinosaur.getDiet()).isEqualTo(UPDATED_DIET);
        assertThat(testDinosaur.getInsertDt()).isEqualTo(UPDATED_INSERT_DT);
        assertThat(testDinosaur.getModifiedDt()).isEqualTo(UPDATED_MODIFIED_DT);
    }

    @Test
    @Transactional
    public void updateNonExistingDinosaur() throws Exception {
        int databaseSizeBeforeUpdate = dinosaurRepository.findAll().size();

        // Create the Dinosaur
        DinosaurDTO dinosaurDTO = dinosaurMapper.toDto(dinosaur);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDinosaurMockMvc.perform(put("/api/dinosaurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dinosaurDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Dinosaur in the database
        List<Dinosaur> dinosaurList = dinosaurRepository.findAll();
        assertThat(dinosaurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDinosaur() throws Exception {
        // Initialize the database
        dinosaurRepository.saveAndFlush(dinosaur);

        int databaseSizeBeforeDelete = dinosaurRepository.findAll().size();

        // Delete the dinosaur
        restDinosaurMockMvc.perform(delete("/api/dinosaurs/{id}", dinosaur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dinosaur> dinosaurList = dinosaurRepository.findAll();
        assertThat(dinosaurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
