package com.example.WebApplication.WebApp.Entryies;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "jobs")
public class Journey {
    @Id
    @JsonIgnore
    private String jourid;

    @NonNull
    private String jortitle;

    @JsonIgnore
    private String userid;

    @NonNull
    private String jorlocation;

    @NonNull
    private String jordescription;

    public @NonNull String getJortitle() {
        return jortitle;
    }

    public void setJortitle(@NonNull String jortitle) {
        this.jortitle = jortitle;
    }

    public @NonNull String getJorlocation() {
        return jorlocation;
    }

    public void setJorlocation(@NonNull String jorlocation) {
        this.jorlocation = jorlocation;
    }

    public @NonNull String getJordescription() {
        return jordescription;
    }

    public void setJordescription(@NonNull String jordescription) {
        this.jordescription = jordescription;
    }

    public Journey(@NonNull String jortitle, @NonNull String jorlocation, @NonNull String jordescription, String userid) {
        this.jortitle = jortitle;
        this.jorlocation = jorlocation;
        this.jordescription = jordescription;
        this.userid =userid;
    }
public Journey() {}

    public String getUserid() {
        return userid;
    }

    public void setUserid( String userid) {
        this.userid = userid;
    }
}
