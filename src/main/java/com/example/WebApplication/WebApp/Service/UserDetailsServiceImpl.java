package com.example.WebApplication.WebApp.Service;

import com.example.WebApplication.WebApp.Entryies.UsersEntries;
import com.example.WebApplication.WebApp.UserRepository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {


    @Autowired
    public UsersRepository userRepository;






    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UsersEntries user =  userRepository.findByUsername(username);
        if(user!=null){
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder().
                    username(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole())
                    .build();
            return userDetails;
        }
        throw new UsernameNotFoundException("User not found with username:"+username);
    }
}
