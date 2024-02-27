package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Expense;
@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
}