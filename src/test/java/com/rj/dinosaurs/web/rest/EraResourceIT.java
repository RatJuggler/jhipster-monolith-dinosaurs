package com.rj.dinosaurs.web.rest;

import com.rj.dinosaurs.DinosaursApp;
import com.rj.dinosaurs.domain.Era;
import com.rj.dinosaurs.repository.EraRepository;
import com.rj.dinosaurs.service.EraService;
import com.rj.dinosaurs.service.dto.EraDTO;
import com.rj.dinosaurs.service.mapper.EraMapper;
import com.rj.dinosaurs.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.rj.dinosaurs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EraResource} REST controller.
 */
@SpringBootTest(classes = DinosaursApp.class)
public class EraResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_FROM_MA = 0;
    private static final Integer UPDATED_FROM_MA = 1;

    private static final Integer DEFAULT_TO_MA = 0;
    private static final Integer UPDATED_TO_MA = 1;

    @Autowired
    private EraRepository eraRepository;

    @Autowired
    private EraMapper eraMapper;

    @Autowired
    private EraService eraService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEraMockMvc;

    private Era era;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EraResource eraResource = new EraResource(eraService);
        this.restEraMockMvc = MockMvcBuilders.standaloneSetup(eraResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Era createEntity(EntityManager em) {
        Era era = new Era()
            .name(DEFAULT_NAME)
            .fromMa(DEFAULT_FROM_MA)
            .toMa(DEFAULT_TO_MA);
        return era;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Era createUpdatedEntity(EntityManager em) {
        Era era = new Era()
            .name(UPDATED_NAME)
            .fromMa(UPDATED_FROM_MA)
            .toMa(UPDATED_TO_MA);
        return era;
    }

    @BeforeEach
    public void initTest() {
        era = createEntity(em);
    }

    @Test
    @Transactional
    public void createEra() throws Exception {
        int databaseSizeBeforeCreate = eraRepository.findAll().size();

        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);
        restEraMockMvc.perform(post("/api/eras")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eraDTO)))
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
    public void createEraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eraRepository.findAll().size();

        // Create the Era with an existing ID
        era.setId(1L);
        EraDTO eraDTO = eraMapper.toDto(era);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEraMockMvc.perform(post("/api/eras")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eraDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = eraRepository.findAll().size();
        // set the field null
        era.setName(null);

        // Create the Era, which fails.
        EraDTO eraDTO = eraMapper.toDto(era);

        restEraMockMvc.perform(post("/api/eras")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eraDTO)))
            .andExpect(status().isBadRequest());

        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEras() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        // Get all the eraList
        restEraMockMvc.perform(get("/api/eras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(era.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].fromMa").value(hasItem(DEFAULT_FROM_MA)))
            .andExpect(jsonPath("$.[*].toMa").value(hasItem(DEFAULT_TO_MA)));
    }
    
    @Test
    @Transactional
    public void getEra() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        // Get the era
        restEraMockMvc.perform(get("/api/eras/{id}", era.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(era.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.fromMa").value(DEFAULT_FROM_MA))
            .andExpect(jsonPath("$.toMa").value(DEFAULT_TO_MA));
    }

    @Test
    @Transactional
    public void getNonExistingEra() throws Exception {
        // Get the era
        restEraMockMvc.perform(get("/api/eras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEra() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        int databaseSizeBeforeUpdate = eraRepository.findAll().size();

        // Update the era
        Era updatedEra = eraRepository.findById(era.getId()).get();
        // Disconnect from session so that the updates on updatedEra are not directly saved in db
        em.detach(updatedEra);
        updatedEra
            .name(UPDATED_NAME)
            .fromMa(UPDATED_FROM_MA)
            .toMa(UPDATED_TO_MA);
        EraDTO eraDTO = eraMapper.toDto(updatedEra);

        restEraMockMvc.perform(put("/api/eras")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eraDTO)))
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
    public void updateNonExistingEra() throws Exception {
        int databaseSizeBeforeUpdate = eraRepository.findAll().size();

        // Create the Era
        EraDTO eraDTO = eraMapper.toDto(era);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEraMockMvc.perform(put("/api/eras")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(eraDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Era in the database
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEra() throws Exception {
        // Initialize the database
        eraRepository.saveAndFlush(era);

        int databaseSizeBeforeDelete = eraRepository.findAll().size();

        // Delete the era
        restEraMockMvc.perform(delete("/api/eras/{id}", era.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Era> eraList = eraRepository.findAll();
        assertThat(eraList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
