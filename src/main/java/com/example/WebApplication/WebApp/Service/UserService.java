package com.example.WebApplication.WebApp.Service;
import com.example.WebApplication.WebApp.Entryies.UsersEntries;
import com.example.WebApplication.WebApp.UserRepository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UsersRepository usersRepository;

    public UsersEntries register(String username, String password,String role) {
        UsersEntries existing = usersRepository.findByUsername(username);
        if (existing != null) return null;
        UsersEntries user = new UsersEntries(username, password,role);
        return usersRepository.save(user);
    }

    public UsersEntries login(String username, String password) {
        UsersEntries user = usersRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password))
            return user;
        return null;
    }
}
