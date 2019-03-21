package com.rj.dinosaurs.web.rest;
import com.rj.dinosaurs.service.CladeService;
import com.rj.dinosaurs.web.rest.errors.BadRequestAlertException;
import com.rj.dinosaurs.web.rest.util.HeaderUtil;
import com.rj.dinosaurs.web.rest.util.PaginationUtil;
import com.rj.dinosaurs.service.dto.CladeDTO;
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
 * REST controller for managing Clade.
 */
@RestController
@RequestMapping("/api")
public class CladeResource {

    private final Logger log = LoggerFactory.getLogger(CladeResource.class);

    private static final String ENTITY_NAME = "clade";

    private final CladeService cladeService;

    public CladeResource(CladeService cladeService) {
        this.cladeService = cladeService;
    }

    /**
     * POST  /clades : Create a new clade.
     *
     * @param cladeDTO the cladeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cladeDTO, or with status 400 (Bad Request) if the clade has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/clades")
    public ResponseEntity<CladeDTO> createClade(@Valid @RequestBody CladeDTO cladeDTO) throws URISyntaxException {
        log.debug("REST request to save Clade : {}", cladeDTO);
        if (cladeDTO.getId() != null) {
            throw new BadRequestAlertException("A new clade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CladeDTO result = cladeService.save(cladeDTO);
        return ResponseEntity.created(new URI("/api/clades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /clades : Updates an existing clade.
     *
     * @param cladeDTO the cladeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cladeDTO,
     * or with status 400 (Bad Request) if the cladeDTO is not valid,
     * or with status 500 (Internal Server Error) if the cladeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/clades")
    public ResponseEntity<CladeDTO> updateClade(@Valid @RequestBody CladeDTO cladeDTO) throws URISyntaxException {
        log.debug("REST request to update Clade : {}", cladeDTO);
        if (cladeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CladeDTO result = cladeService.save(cladeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cladeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /clades : get all the clades.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of clades in body
     */
    @GetMapping("/clades")
    public ResponseEntity<List<CladeDTO>> getAllClades(Pageable pageable) {
        log.debug("REST request to get a page of Clades");
        Page<CladeDTO> page = cladeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/clades");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /clades/:id : get the "id" clade.
     *
     * @param id the id of the cladeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cladeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/clades/{id}")
    public ResponseEntity<CladeDTO> getClade(@PathVariable Long id) {
        log.debug("REST request to get Clade : {}", id);
        Optional<CladeDTO> cladeDTO = cladeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cladeDTO);
    }

    /**
     * DELETE  /clades/:id : delete the "id" clade.
     *
     * @param id the id of the cladeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/clades/{id}")
    public ResponseEntity<Void> deleteClade(@PathVariable Long id) {
        log.debug("REST request to delete Clade : {}", id);
        cladeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
