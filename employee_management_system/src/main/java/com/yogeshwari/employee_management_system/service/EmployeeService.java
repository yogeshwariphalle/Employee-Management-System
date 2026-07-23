package com.yogeshwari.employee_management_system.service;



import com.yogeshwari.employee_management_system.dto.EmployeeDTO;
import com.yogeshwari.employee_management_system.exception.EmployeeNotFoundException;
import com.yogeshwari.employee_management_system.model.Employee;
import com.yogeshwari.employee_management_system.model.EmployeeStatus;
import com.yogeshwari.employee_management_system.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // ✅ CREATE Employee
    public Employee createEmployee(EmployeeDTO dto) {
        if (employeeRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists: " + dto.getEmail());
        }
        Employee employee = Employee.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .department(dto.getDepartment())
                .designation(dto.getDesignation())
                .salary(dto.getSalary())
                .status(dto.getStatus() != null ? dto.getStatus() : EmployeeStatus.ACTIVE)
                .build();
        return employeeRepository.save(employee);
    }

    // ✅ GET ALL Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // ✅ GET Employee by ID
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    // ✅ UPDATE Employee
    public Employee updateEmployee(Long id, EmployeeDTO dto) {
        Employee employee = getEmployeeById(id);

        // Check email conflict
        if (!employee.getEmail().equals(dto.getEmail()) &&
                employeeRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already in use: " + dto.getEmail());
        }

        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setDepartment(dto.getDepartment());
        employee.setDesignation(dto.getDesignation());
        employee.setSalary(dto.getSalary());
        if (dto.getStatus() != null) employee.setStatus(dto.getStatus());

        return employeeRepository.save(employee);
    }

    // ✅ DELETE Employee
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }
        employeeRepository.deleteById(id);
    }

    // ✅ SEARCH Employees
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.searchEmployees(keyword);
    }

    // ✅ GET by Department
    public List<Employee> getByDepartment(String department) {
        return employeeRepository.findByDepartment(department);
    }

    // ✅ GET by Status
    public List<Employee> getByStatus(String status) {
        return employeeRepository.findByStatus(EmployeeStatus.valueOf(status.toUpperCase()));
    }

    // ✅ GET by Salary Range
    public List<Employee> getBySalaryRange(Double min, Double max) {
        return employeeRepository.findBySalaryRange(min, max);
    }

    // ✅ DASHBOARD Stats
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalEmployees", employeeRepository.count());
        stats.put("activeEmployees",
                employeeRepository.findByStatus(EmployeeStatus.ACTIVE).size());
        stats.put("inactiveEmployees",
                employeeRepository.findByStatus(EmployeeStatus.INACTIVE).size());
        stats.put("onLeaveEmployees",
                employeeRepository.findByStatus(EmployeeStatus.ON_LEAVE).size());
        stats.put("totalSalaryBill", employeeRepository.getTotalSalary());

        // Department wise count
        List<Object[]> deptCount = employeeRepository.countByDepartment();
        Map<String, Long> deptMap = new LinkedHashMap<>();
        for (Object[] row : deptCount) {
            deptMap.put((String) row[0], (Long) row[1]);
        }
        stats.put("departmentWiseCount", deptMap);
        return stats;
    }

    // ✅ UPDATE Status Only
    public Employee updateStatus(Long id, String status) {
        Employee employee = getEmployeeById(id);
        employee.setStatus(EmployeeStatus.valueOf(status.toUpperCase()));
        return employeeRepository.save(employee);
    }
}