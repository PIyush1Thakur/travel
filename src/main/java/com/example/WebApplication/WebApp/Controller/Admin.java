package com.example.WebApplication.WebApp.Controller;

import com.example.WebApplication.WebApp.Entryies.Complaint;
import com.example.WebApplication.WebApp.Entryies.UsersEntries;
import com.example.WebApplication.WebApp.UserRepository.ComplaintRepository;
import com.example.WebApplication.WebApp.UserRepository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class Admin {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        UsersEntries user = usersRepository.findByUsername(username);

        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username!");
        if (!user.getPassword().equals(password)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password!");
        if (!"ADMIN".equalsIgnoreCase(user.getRole())) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not an admin!");

        // Success: return admin ID
        return ResponseEntity.ok(user.getId());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintRepository.findAll());
    }

    @PutMapping("/identities/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable String id, @RequestParam String status) {
        Complaint entry = complaintRepository.findById(id).orElse(null);
        if (entry == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found");

        entry.setStatus(status);
        complaintRepository.save(entry);
        return ResponseEntity.ok("OK");
    }

    @DeleteMapping("/identities/{id}")
    public ResponseEntity<String> deleteIdentity(@PathVariable String id) {
        complaintRepository.deleteById(id);
        return ResponseEntity.ok("OK");
    }
}
