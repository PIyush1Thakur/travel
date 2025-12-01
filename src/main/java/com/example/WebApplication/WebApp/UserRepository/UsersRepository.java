package com.example.WebApplication.WebApp.UserRepository;

import com.example.WebApplication.WebApp.Entryies.UsersEntries;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends MongoRepository<UsersEntries, String> {
    UsersEntries findByUsername(String username);
    boolean existsByUsername(String username);
}
