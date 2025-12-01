package com.example.WebApplication.WebApp.Controller;

import com.example.WebApplication.WebApp.Entryies.Journey;
import com.example.WebApplication.WebApp.Entryies.UsersEntries;
import com.example.WebApplication.WebApp.UserRepository.Journey_Repository;
import com.example.WebApplication.WebApp.UserRepository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/user")
public class Journey_controller {


    @Autowired
    private Journey_Repository journeyRepository;

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/whoami")
    public String whoAmI(Authentication auth) {
        return "You are " + auth.getName() + " with roles: " + auth.getAuthorities();
    }




    @GetMapping("/journey/my")
    public List<Journey> showmyall(){
        try{
            Authentication authentication=  SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            UsersEntries id = usersRepository.findByUsername(username);
            if(usersRepository.existsByUsername(username))
                return   journeyRepository.findByUserid(id.getId());

        }catch (Exception e){
            return null;
        }
        return List.of();
    }


    @GetMapping("/journey/all")
    public List<Journey> showall(){
        try{
                return   journeyRepository.findAll();
        }catch (Exception e){
            return null;
        }

    }

    @PostMapping("/add/journey")
    @Transactional
    public ResponseEntity<?> addProduct(@RequestBody Journey journey){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("User not found or not logged in");
            }

            // Fetch user entity
            UsersEntries userEntity  = usersRepository.findByUsername(username);

            if (userEntity == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("User not found in database");
            }


            Journey newJourney = new Journey(
                    journey.getJortitle(),
                    journey.getJorlocation(),
                    journey.getJordescription(),
                    userEntity.getId()  // safe now
            );

            journeyRepository.save(newJourney);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Journey Added Successfully");

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                    .body("Error: " + e.getMessage());
        }
    }


    @DeleteMapping("/jounery/{id}")
    public ResponseEntity<?> deletejourney(@PathVariable String id){
        if(id != null && journeyRepository.existsById(id)){
            journeyRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Journey deleted Successfully");


        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Journey Not deleted Successfully");
    }



}
