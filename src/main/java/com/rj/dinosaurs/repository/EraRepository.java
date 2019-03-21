package com.rj.dinosaurs.repository;

import com.rj.dinosaurs.domain.Era;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Era entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EraRepository extends JpaRepository<Era, Long> {

}
