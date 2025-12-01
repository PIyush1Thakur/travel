package com.example.WebApplication.WebApp.UserRepository;

import com.example.WebApplication.WebApp.Entryies.Journey;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.awt.desktop.OpenFilesEvent;
import java.util.List;
import java.util.Optional;

@Repository
public interface Journey_Repository extends MongoRepository<Journey, String> {
//    Optional<Journey> findByUserid(String userid);
    List<Journey> findByUserid(String id);



}
