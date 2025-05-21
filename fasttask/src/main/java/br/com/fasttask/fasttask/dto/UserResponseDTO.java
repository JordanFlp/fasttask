package br.com.fasttask.fasttask.dto;

import java.util.Base64;
import br.com.fasttask.fasttask.model.User;

public class UserResponseDTO {
    private Integer id;
    private String name;
    private String email;
    private String address;
    private String phone;
    private String birthdate;
    private String photoBase64;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.phone = user.getPhone();
        this.birthdate = user.getBirthdate() != null ? user.getBirthdate().toString() : null;
        
        if (user.getPhoto() != null && user.getPhoto().length > 0) {
            String base64 = Base64.getEncoder().encodeToString(user.getPhoto());
            this.photoBase64 = "data:image/png;base64," + base64;
        }
    }


    
    public Integer getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getAddress() { return address; }
    public String getPhone() { return phone; }
    public String getBirthdate() { return birthdate; }
    public String getPhotoBase64() { return photoBase64; }
}
