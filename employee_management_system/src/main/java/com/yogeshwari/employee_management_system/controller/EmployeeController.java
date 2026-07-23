package com.yogeshwari.employee_management_system.controller;



import com.yogeshwari.employee_management_system.dto.EmployeeDTO;
import com.yogeshwari.employee_management_system.model.Employee;
import com.yogeshwari.employee_management_system.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    // ✅ CREATE - POST /api/employees
    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @Valid @RequestBody EmployeeDTO dto) {
        Employee employee = employeeService.createEmployee(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(employee);
    }

    // ✅ GET ALL - GET /api/employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // ✅ GET BY ID - GET /api/employees/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    // ✅ UPDATE - PUT /api/employees/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeDTO dto) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, dto));
    }

    // ✅ DELETE - DELETE /api/employees/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Employee deleted successfully with ID: " + id);
        return ResponseEntity.ok(response);
    }

    // ✅ SEARCH - GET /api/employees/search?keyword=java
    @GetMapping("/search")
    public ResponseEntity<List<Employee>> searchEmployees(
            @RequestParam String keyword) {
        return ResponseEntity.ok(employeeService.searchEmployees(keyword));
    }

    // ✅ GET BY DEPARTMENT - GET /api/employees/department/IT
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Employee>> getByDepartment(
            @PathVariable String department) {
        return ResponseEntity.ok(employeeService.getByDepartment(department));
    }

    // ✅ GET BY STATUS - GET /api/employees/status/ACTIVE
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Employee>> getByStatus(
            @PathVariable String status) {
        return ResponseEntity.ok(employeeService.getByStatus(status));
    }

    // ✅ GET BY SALARY RANGE - GET /api/employees/salary?min=10000&max=50000
    @GetMapping("/salary")
    public ResponseEntity<List<Employee>> getBySalaryRange(
            @RequestParam Double min,
            @RequestParam Double max) {
        return ResponseEntity.ok(employeeService.getBySalaryRange(min, max));
    }

    // ✅ DASHBOARD - GET /api/employees/dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(employeeService.getDashboardStats());
    }

    // ✅ UPDATE STATUS - PATCH /api/employees/{id}/status?status=INACTIVE
    @PatchMapping("/{id}/status")
    public ResponseEntity<Employee> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(employeeService.updateStatus(id, status));
    }
}
