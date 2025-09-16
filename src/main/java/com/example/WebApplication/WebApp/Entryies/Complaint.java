package com.example.WebApplication.WebApp.Entryies;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "complaints")
public class Complaint {
    @Id
    private String id;
      private String userId;



    private String cUsername;

    private String title;
     private String description;
    private String image;
    private String location;
    private String status = "Pending";

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    public Complaint() {

    }
    public String getCUsername() {
        return cUsername;
    }
    public void setCUsername(String cUsername) {
        this.cUsername = cUsername;
    }


    public Complaint(String userId, String title, String description, String image,String location ,String cUsername) {
          this.userId = userId;
         this.title = title;
        this.description = description;
        this.image = image;
        this.location =location;
        this.cUsername = cUsername;
    }


    public String getId()
    {
        return id;
    }
    public void setId(String id)
    {
        this.id = id;
    }

    public String getUserId()
    {
        return userId;
    }
    public void setUserId(String userId)
    {
        this.userId = userId;
    }

    public String getTitle()
    {
        return title;
    }
    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getDescription()
    {
        return description;
    }
    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getImage()
    {
        return image;
    }
    public void setImage(String image)
    {
        this.image = image;
    }
}
