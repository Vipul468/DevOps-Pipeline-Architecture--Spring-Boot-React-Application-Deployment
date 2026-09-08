package com.example.devopsapp;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final List<Employee> employees = List.of(
        new Employee(1L, "Rahul Sharma", "Java Developer", "Engineering", "rahul@example.com"),
        new Employee(2L, "Amit Kumar", "DevOps Engineer", "Platform", "amit@example.com"),
        new Employee(3L, "Neha Singh", "Frontend Developer", "UI", "neha@example.com"),
        new Employee(4L, "Priya Verma", "Cloud Engineer", "Cloud", "priya@example.com")
    );

    @GetMapping
    public List<Employee> getEmployees() {
        return employees;
    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        return employees.stream()
            .filter(e -> e.id().equals(id))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @GetMapping("/health")
    public String health() {
        return "Backend is running";
    }
}
