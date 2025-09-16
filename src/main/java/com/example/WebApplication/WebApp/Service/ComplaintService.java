package com.example.WebApplication.WebApp.Service;


import com.example.WebApplication.WebApp.Entryies.Complaint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.WebApplication.WebApp.UserRepository.ComplaintRepository;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepo;

    public Complaint save(Complaint complaint) {
        return complaintRepo.save(complaint);
    }

    public List<Complaint> findByUserId(String userId) {
        return complaintRepo.findByUserId(userId);
    }

    public List<Complaint> findAll() {
        return complaintRepo.findAll();
    }

    public void deleteById(String id) {
        complaintRepo.deleteById(id);
    }
}
