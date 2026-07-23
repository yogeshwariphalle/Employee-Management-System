package com.yogeshwari.employee_management_system.exception;

// EmployeeNotFoundException.java

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(String message) {
        super(message);
    }
    public EmployeeNotFoundException(Long id) {
        super("Employee not found with ID: " + id);
    }
}