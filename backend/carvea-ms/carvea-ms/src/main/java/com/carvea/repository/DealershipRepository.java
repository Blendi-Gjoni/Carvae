package com.carvea.repository;

import com.carvea.model.Dealership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealershipRepository extends JpaRepository<Dealership, Long> {
    @Query("SELECT d.state, COUNT(d) FROM Dealership d GROUP BY d.state")
    List<Object[]> findNumberOfDealershipsByState();
}
