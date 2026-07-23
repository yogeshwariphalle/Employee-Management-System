package com.yogeshwari.employee_management_system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
    public class Employee {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank(message = "Name is required")
        @Column(nullable = false)
        private String name;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        @Column(unique = true, nullable = false)
        private String email;

        @NotBlank(message = "Phone is required")
        @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
        private String phone;

        @NotBlank(message = "Department is required")
        private String department;

        @NotBlank(message = "Designation is required")
        private String designation;

        @NotNull(message = "Salary is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Salary must be greater than 0")
        private Double salary;

        @Enumerated(EnumType.STRING)
        private EmployeeStatus status;

        @Column(name = "joining_date")
        private LocalDateTime joiningDate;

        @Column(name = "created_at")
        private LocalDateTime createdAt;

        @Column(name = "updated_at")
        private LocalDateTime updatedAt;

        @PrePersist
        protected void onCreate() {
            createdAt = LocalDateTime.now();
            updatedAt = LocalDateTime.now();
            joiningDate = LocalDateTime.now();
            if (status == null) status = EmployeeStatus.ACTIVE;
        }

        @PreUpdate
        protected void onUpdate() {
            updatedAt = LocalDateTime.now();
        }
    }
