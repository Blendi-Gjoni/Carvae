package com.carvea.specification;

import com.carvea.model.Rental;
import jakarta.persistence.criteria.Predicate;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class RentalSpecification {
    public static Specification<Rental> filterRental(String name) {
        return (root, query, criteriaBuilder) -> {
            Predicate namePredicate = criteriaBuilder.like(
                    root.get("name"),
                    StringUtils.isBlank(name) ? likePattern("") : likePattern(name)
            );

            return namePredicate;
        };
    }

    private static String likePattern(String value) {
        return "%" + value + "%";
    }
}
