package com.aelb.dto;

public class FacebookPostDto {
    private String id;
    private String message;
    private String fullPicture;
    private String createdTime;
    private String permalinkUrl;

    public FacebookPostDto() {}

    public FacebookPostDto(String id, String message, String fullPicture, String createdTime, String permalinkUrl) {
        this.id = id;
        this.message = message;
        this.fullPicture = fullPicture;
        this.createdTime = createdTime;
        this.permalinkUrl = permalinkUrl;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getFullPicture() { return fullPicture; }
    public void setFullPicture(String fullPicture) { this.fullPicture = fullPicture; }

    public String getCreatedTime() { return createdTime; }
    public void setCreatedTime(String createdTime) { this.createdTime = createdTime; }

    public String getPermalinkUrl() { return permalinkUrl; }
    public void setPermalinkUrl(String permalinkUrl) { this.permalinkUrl = permalinkUrl; }
}
