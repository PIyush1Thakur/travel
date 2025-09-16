package com.example.WebApplication.WebApp.Entryies;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class UsersEntries {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String username;
    private String password;
    private String role = "USER";

    public String getRole() {
        return role;
    }
    public boolean isAdmin() {
        return "ADMIN".equalsIgnoreCase(role);
    }

    public void setRole(String role) {
        this.role = role;
    }

    public UsersEntries() {

    }

    public UsersEntries(String username, String password,String role) {
        this.username = username;
        this.password = password;
        this.role=role;
    }

    public String getId()
    {
        return id;
    }
    public String getUsername()
    {
        return username;
    }
    public void setUsername(String username)
    {
        this.username = username;
    }
    public String getPassword()
    {
        return password;
    }
    public void setPassword(String password)
    {
        this.password = password;
    }
}
