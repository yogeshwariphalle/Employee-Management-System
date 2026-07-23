package com.yogeshwari.employee_management_system.repository;


import com.yogeshwari.employee_management_system.model.Employee;
import com.yogeshwari.employee_management_system.model.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Find by email
    Optional<Employee> findByEmail(String email);

    // Check email exists
    boolean existsByEmail(String email);

    // Find by department
    List<Employee> findByDepartment(String department);

    // Find by status
    List<Employee> findByStatus(EmployeeStatus status);

    // Search by name or email
    @Query("SELECT e FROM Employee e WHERE " +
            "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.department) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> searchEmployees(@Param("keyword") String keyword);

    // Find by salary range
    @Query("SELECT e FROM Employee e WHERE e.salary BETWEEN :minSalary AND :maxSalary")
    List<Employee> findBySalaryRange(
            @Param("minSalary") Double minSalary,
            @Param("maxSalary") Double maxSalary);

    // Count by department
    @Query("SELECT e.department, COUNT(e) FROM Employee e GROUP BY e.department")
    List<Object[]> countByDepartment();

    // Get total salary
    @Query("SELECT SUM(e.salary) FROM Employee e WHERE e.status = 'ACTIVE'")
    Double getTotalSalary();
}