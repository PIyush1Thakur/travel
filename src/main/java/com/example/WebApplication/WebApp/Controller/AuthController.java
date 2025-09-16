package com.example.WebApplication.WebApp.Controller;

import com.example.WebApplication.WebApp.Entryies.UsersEntries;
import com.example.WebApplication.WebApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password,@RequestParam(required = false, defaultValue = "USER") String role){
        UsersEntries user = userService.register(username, password,role);
        if (user == null)
            return "Username already exists!";
        return "Registration successful!";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        UsersEntries user = userService.login(username, password);
        if (user == null) return "Invalid credentials!";
        return user.getId();
    }
}
