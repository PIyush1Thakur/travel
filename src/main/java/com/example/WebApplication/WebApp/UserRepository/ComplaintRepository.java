package com.example.WebApplication.WebApp.UserRepository;

import com.example.WebApplication.WebApp.Entryies.Complaint;
import com.example.WebApplication.WebApp.Entryies.UsersEntries;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    List<Complaint> findByUserId(String userId);

    Complaint findByCUsername(String cUsername);
}
