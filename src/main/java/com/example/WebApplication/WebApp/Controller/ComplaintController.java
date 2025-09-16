package com.example.WebApplication.WebApp.Controller;

import com.example.WebApplication.WebApp.Entryies.Complaint;
import com.example.WebApplication.WebApp.UserRepository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/complaints")
@CrossOrigin
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addComplaint(@RequestParam String userId, @RequestParam String title, @RequestParam String description, @RequestParam("image") MultipartFile image,@RequestParam String location,@RequestParam String c_username) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path uploadPath = Paths.get("uploads");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(image.getInputStream(), uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

        Complaint complaint = new Complaint(userId, title, description, fileName,location,c_username);
        complaintRepository.save(complaint);

        return ResponseEntity.ok("Complaint added successfully!");
    }

    @GetMapping("/all")
    public List<Complaint> getAllComplaints() {
            return complaintRepository.findAll();
    }


    @GetMapping("/job")
    public List<Complaint> getjob(){
        return complaintRepository.findAll();
    }
    @GetMapping("/user/{userId}")
    public List<Complaint> getUserComplaints(@PathVariable String userId) {
            return complaintRepository.findByUserId(userId);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteComplaint(@PathVariable String id,
                                                  @RequestParam(required = false) String userId) {
        Optional<Complaint> opt = complaintRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.status(404).body("Not Found");

        Complaint c = opt.get();
        if (userId != null && !userId.equals(c.getUserId())) {
            return ResponseEntity.status(403).body("Forbidden");
        }
        complaintRepository.deleteById(id);
        return ResponseEntity.ok("OK");
    }
    @PutMapping("/{id}/status")
    public String updateStatus(@PathVariable String id, @RequestParam String status) {
        Complaint c = complaintRepository.findById(id).orElse(null);
        if (c == null) return "Not Found";
        c.setStatus(status);
        complaintRepository.save(c);
        return "OK";
    }

}
