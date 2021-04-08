package com.rj.dinosaurs.web.rest;

import com.rj.dinosaurs.repository.DinosaurRepository;
import com.rj.dinosaurs.service.DinosaurService;
import com.rj.dinosaurs.service.dto.DinosaurDTO;
import com.rj.dinosaurs.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.rj.dinosaurs.domain.Dinosaur}.
 */
@RestController
@RequestMapping("/api")
public class DinosaurResource {

    private final Logger log = LoggerFactory.getLogger(DinosaurResource.class);

    private static final String ENTITY_NAME = "dinosaur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DinosaurService dinosaurService;

    private final DinosaurRepository dinosaurRepository;

    public DinosaurResource(DinosaurService dinosaurService, DinosaurRepository dinosaurRepository) {
        this.dinosaurService = dinosaurService;
        this.dinosaurRepository = dinosaurRepository;
    }

    /**
     * {@code POST  /dinosaurs} : Create a new dinosaur.
     *
     * @param dinosaurDTO the dinosaurDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dinosaurDTO, or with status {@code 400 (Bad Request)} if the dinosaur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dinosaurs")
    public ResponseEntity<DinosaurDTO> createDinosaur(@Valid @RequestBody DinosaurDTO dinosaurDTO) throws URISyntaxException {
        log.debug("REST request to save Dinosaur : {}", dinosaurDTO);
        if (dinosaurDTO.getId() != null) {
            throw new BadRequestAlertException("A new dinosaur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DinosaurDTO result = dinosaurService.save(dinosaurDTO);
        return ResponseEntity
            .created(new URI("/api/dinosaurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dinosaurs/:id} : Updates an existing dinosaur.
     *
     * @param id the id of the dinosaurDTO to save.
     * @param dinosaurDTO the dinosaurDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dinosaurDTO,
     * or with status {@code 400 (Bad Request)} if the dinosaurDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dinosaurDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dinosaurs/{id}")
    public ResponseEntity<DinosaurDTO> updateDinosaur(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DinosaurDTO dinosaurDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Dinosaur : {}, {}", id, dinosaurDTO);
        if (dinosaurDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dinosaurDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dinosaurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DinosaurDTO result = dinosaurService.save(dinosaurDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dinosaurDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /dinosaurs/:id} : Partial updates given fields of an existing dinosaur, field will ignore if it is null
     *
     * @param id the id of the dinosaurDTO to save.
     * @param dinosaurDTO the dinosaurDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dinosaurDTO,
     * or with status {@code 400 (Bad Request)} if the dinosaurDTO is not valid,
     * or with status {@code 404 (Not Found)} if the dinosaurDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the dinosaurDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/dinosaurs/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<DinosaurDTO> partialUpdateDinosaur(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DinosaurDTO dinosaurDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Dinosaur partially : {}, {}", id, dinosaurDTO);
        if (dinosaurDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dinosaurDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dinosaurRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DinosaurDTO> result = dinosaurService.partialUpdate(dinosaurDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dinosaurDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /dinosaurs} : get all the dinosaurs.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dinosaurs in body.
     */
    @GetMapping("/dinosaurs")
    public ResponseEntity<List<DinosaurDTO>> getAllDinosaurs(Pageable pageable) {
        log.debug("REST request to get a page of Dinosaurs");
        Page<DinosaurDTO> page = dinosaurService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /dinosaurs/:id} : get the "id" dinosaur.
     *
     * @param id the id of the dinosaurDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dinosaurDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dinosaurs/{id}")
    public ResponseEntity<DinosaurDTO> getDinosaur(@PathVariable Long id) {
        log.debug("REST request to get Dinosaur : {}", id);
        Optional<DinosaurDTO> dinosaurDTO = dinosaurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dinosaurDTO);
    }

    /**
     * {@code DELETE  /dinosaurs/:id} : delete the "id" dinosaur.
     *
     * @param id the id of the dinosaurDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dinosaurs/{id}")
    public ResponseEntity<Void> deleteDinosaur(@PathVariable Long id) {
        log.debug("REST request to delete Dinosaur : {}", id);
        dinosaurService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
