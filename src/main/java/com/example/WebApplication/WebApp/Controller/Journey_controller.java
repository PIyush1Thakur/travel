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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/user")
public class Journey_controller {


    @Autowired
    private Journey_Repository journeyRepository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";


    @Autowired
    private UsersRepository usersRepository;

//    @GetMapping("/whoami")
//    public String whoAmI(Authentication auth) {
//        return "You are " + auth.getName() + " with roles: " + auth.getAuthorities();
//    }

    // Team need to load that fast


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


    @GetMapping("/journey")
    public List<Journey> showall(){
        try{
                return   journeyRepository.findAll();
        }catch (Exception e){
            return null;
        }

    }

    @PostMapping("/add/journey")
    @Transactional
    public ResponseEntity<?> addProduct(@RequestParam("jortitle") String title, @RequestParam("jorlocation") String location, @RequestParam("jordescription") String description,
            @RequestParam("image") MultipartFile image) {

        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            var user = usersRepository.findByUsername(username);
            if (user == null) {
                return ResponseEntity.status(404).body("User not found.");
            }
            Path uploadDir = Paths.get("uploads").toAbsolutePath();
            File folder = uploadDir.toFile();
            if (!folder.exists() && !folder.mkdirs()) {
                return ResponseEntity.status(500).body("Cannot create uploads directory.");
            }
            String originalName = StringUtils.cleanPath(image.getOriginalFilename());
            String fileName = System.currentTimeMillis() + "_" + originalName;
            Path filePath = uploadDir.resolve(fileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            Journey journey = new Journey(
                    title,
                    location,
                    description,
                    user.getId(),
                    "uploads/" + fileName
            );

            journeyRepository.save(journey);

            return ResponseEntity.ok("Journey added successfully!");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // for future use , Team remember

    @DeleteMapping("/jounery/{id}")
    public ResponseEntity<?> deletejourney(@PathVariable String id){
        if(id != null && journeyRepository.existsById(id)){
            journeyRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Journey deleted Successfully");


        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Journey Not deleted Successfully");
    }



}
