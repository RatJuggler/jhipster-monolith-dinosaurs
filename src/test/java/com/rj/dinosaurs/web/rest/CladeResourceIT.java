package com.rj.dinosaurs.web.rest;

import com.rj.dinosaurs.DinosaursApp;
import com.rj.dinosaurs.domain.Clade;
import com.rj.dinosaurs.repository.CladeRepository;
import com.rj.dinosaurs.service.CladeService;
import com.rj.dinosaurs.service.dto.CladeDTO;
import com.rj.dinosaurs.service.mapper.CladeMapper;
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
 * Integration tests for the {@link CladeResource} REST controller.
 */
@SpringBootTest(classes = DinosaursApp.class)
public class CladeResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private CladeRepository cladeRepository;

    @Autowired
    private CladeMapper cladeMapper;

    @Autowired
    private CladeService cladeService;

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

    private MockMvc restCladeMockMvc;

    private Clade clade;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CladeResource cladeResource = new CladeResource(cladeService);
        this.restCladeMockMvc = MockMvcBuilders.standaloneSetup(cladeResource)
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
    public static Clade createEntity(EntityManager em) {
        Clade clade = new Clade()
            .description(DEFAULT_DESCRIPTION);
        return clade;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Clade createUpdatedEntity(EntityManager em) {
        Clade clade = new Clade()
            .description(UPDATED_DESCRIPTION);
        return clade;
    }

    @BeforeEach
    public void initTest() {
        clade = createEntity(em);
    }

    @Test
    @Transactional
    public void createClade() throws Exception {
        int databaseSizeBeforeCreate = cladeRepository.findAll().size();

        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);
        restCladeMockMvc.perform(post("/api/clades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isCreated());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeCreate + 1);
        Clade testClade = cladeList.get(cladeList.size() - 1);
        assertThat(testClade.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createCladeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cladeRepository.findAll().size();

        // Create the Clade with an existing ID
        clade.setId(1L);
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCladeMockMvc.perform(post("/api/clades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cladeRepository.findAll().size();
        // set the field null
        clade.setDescription(null);

        // Create the Clade, which fails.
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        restCladeMockMvc.perform(post("/api/clades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isBadRequest());

        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClades() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        // Get all the cladeList
        restCladeMockMvc.perform(get("/api/clades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clade.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getClade() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        // Get the clade
        restCladeMockMvc.perform(get("/api/clades/{id}", clade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clade.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingClade() throws Exception {
        // Get the clade
        restCladeMockMvc.perform(get("/api/clades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClade() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();

        // Update the clade
        Clade updatedClade = cladeRepository.findById(clade.getId()).get();
        // Disconnect from session so that the updates on updatedClade are not directly saved in db
        em.detach(updatedClade);
        updatedClade
            .description(UPDATED_DESCRIPTION);
        CladeDTO cladeDTO = cladeMapper.toDto(updatedClade);

        restCladeMockMvc.perform(put("/api/clades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isOk());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
        Clade testClade = cladeList.get(cladeList.size() - 1);
        assertThat(testClade.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingClade() throws Exception {
        int databaseSizeBeforeUpdate = cladeRepository.findAll().size();

        // Create the Clade
        CladeDTO cladeDTO = cladeMapper.toDto(clade);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCladeMockMvc.perform(put("/api/clades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cladeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Clade in the database
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClade() throws Exception {
        // Initialize the database
        cladeRepository.saveAndFlush(clade);

        int databaseSizeBeforeDelete = cladeRepository.findAll().size();

        // Delete the clade
        restCladeMockMvc.perform(delete("/api/clades/{id}", clade.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Clade> cladeList = cladeRepository.findAll();
        assertThat(cladeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
