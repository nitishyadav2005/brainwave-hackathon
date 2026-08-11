package com.abtalks.dto;

public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String college;
    private String track;

    public UserDto() {
    }

    public UserDto(Long id, String name, String email, String college, String track) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.college = college;
        this.track = track;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getTrack() {
        return track;
    }

    public void setTrack(String track) {
        this.track = track;
    }
}
