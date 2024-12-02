package net.york.tsg.specialization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpecializationRepository
    extends JpaRepository<Specialization, Long> {

    @Query("SELECT s FROM Specialization s WHERE s.name = ?1")
    Optional<Specialization> findSpecializationByName(String name);
}