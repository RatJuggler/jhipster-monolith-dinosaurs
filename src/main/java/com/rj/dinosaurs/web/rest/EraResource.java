package com.rj.dinosaurs.web.rest;
import com.rj.dinosaurs.service.EraService;
import com.rj.dinosaurs.web.rest.errors.BadRequestAlertException;
import com.rj.dinosaurs.web.rest.util.HeaderUtil;
import com.rj.dinosaurs.web.rest.util.PaginationUtil;
import com.rj.dinosaurs.service.dto.EraDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Era.
 */
@RestController
@RequestMapping("/api")
public class EraResource {

    private final Logger log = LoggerFactory.getLogger(EraResource.class);

    private static final String ENTITY_NAME = "era";

    private final EraService eraService;

    public EraResource(EraService eraService) {
        this.eraService = eraService;
    }

    /**
     * POST  /eras : Create a new era.
     *
     * @param eraDTO the eraDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eraDTO, or with status 400 (Bad Request) if the era has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/eras")
    public ResponseEntity<EraDTO> createEra(@Valid @RequestBody EraDTO eraDTO) throws URISyntaxException {
        log.debug("REST request to save Era : {}", eraDTO);
        if (eraDTO.getId() != null) {
            throw new BadRequestAlertException("A new era cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EraDTO result = eraService.save(eraDTO);
        return ResponseEntity.created(new URI("/api/eras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /eras : Updates an existing era.
     *
     * @param eraDTO the eraDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eraDTO,
     * or with status 400 (Bad Request) if the eraDTO is not valid,
     * or with status 500 (Internal Server Error) if the eraDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/eras")
    public ResponseEntity<EraDTO> updateEra(@Valid @RequestBody EraDTO eraDTO) throws URISyntaxException {
        log.debug("REST request to update Era : {}", eraDTO);
        if (eraDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EraDTO result = eraService.save(eraDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eraDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /eras : get all the eras.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of eras in body
     */
    @GetMapping("/eras")
    public ResponseEntity<List<EraDTO>> getAllEras(Pageable pageable) {
        log.debug("REST request to get a page of Eras");
        Page<EraDTO> page = eraService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/eras");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /eras/:id : get the "id" era.
     *
     * @param id the id of the eraDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eraDTO, or with status 404 (Not Found)
     */
    @GetMapping("/eras/{id}")
    public ResponseEntity<EraDTO> getEra(@PathVariable Long id) {
        log.debug("REST request to get Era : {}", id);
        Optional<EraDTO> eraDTO = eraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(eraDTO);
    }

    /**
     * DELETE  /eras/:id : delete the "id" era.
     *
     * @param id the id of the eraDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/eras/{id}")
    public ResponseEntity<Void> deleteEra(@PathVariable Long id) {
        log.debug("REST request to delete Era : {}", id);
        eraService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
