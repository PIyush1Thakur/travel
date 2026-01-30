package com.example.WebApplication.WebApp.Entryies;


import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "userdata")
public class UsersEntries {
    @Id
    private String id;

    @NonNull
    private String username;

    @NonNull
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

        // 20-6-25

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
