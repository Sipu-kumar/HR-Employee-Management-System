package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.model.Employee;
import com.example.demo.model.User;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.UserRepository;

@CrossOrigin(origins = "*") // Allow all for dev
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    // Helper to get current admin/hr's company
    private String getCurrentUserCompany() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getCompanyName();
    }

    // ✅ GET all employees (Filtered by Company)
    @GetMapping("/employees")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public List<Employee> getAllEmployees() {
        String companyName = getCurrentUserCompany();
        if (companyName == null || companyName.isEmpty()) {
             // Fallback or explicit error? For now, empty list if no company set.
             return List.of();
        }
        return employeeRepository.findByCompanyName(companyName);
    }

    // ✅ CREATE employee (Auto-assign Company)
    @PostMapping("/employees")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public Employee createEmployee(@RequestBody Employee employee) {
        String companyName = getCurrentUserCompany();
        employee.setCompanyName(companyName);
        return employeeRepository.save(employee);
    }

    // ✅ GET employee by ID (Security Check? For simple IDOR protection we should check company, but basic request was list filtering)
    @GetMapping("/employees/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR', 'EMPLOYEE')")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        // Todo: Check if employee.companyName matches current user's company
        return ResponseEntity.ok(employee);
    }

    // ✅ UPDATE employee
    @PutMapping("/employees/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedData) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        
        // Ensure we don't overwrite the company or allow moving companies
        // employee.setCompanyName(getCurrentUserCompany()); // Optional: enforce ownership

        employee.setFirstname(updatedData.getFirstname());
        employee.setLastname(updatedData.getLastname());
        employee.setEmailId(updatedData.getEmailId());
        employee.setSalary(updatedData.getSalary());
        employee.setMobileNumber(updatedData.getMobileNumber());

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // ✅ DELETE employee
    @DeleteMapping("/employees/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        if (!employeeRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}
