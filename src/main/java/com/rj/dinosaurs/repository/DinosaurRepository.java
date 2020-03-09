package com.rj.dinosaurs.repository;

import com.rj.dinosaurs.domain.Dinosaur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Dinosaur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DinosaurRepository extends JpaRepository<Dinosaur, Long> {
}
