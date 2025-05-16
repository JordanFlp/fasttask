package br.com.fasttask.fasttask.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "email", nullable = false, unique = true, length = 100)
	private String email;
	
	@Column(name = "password", nullable = false, length = 100)
	private String password;
	
	@Column(name = "name", length = 100)
	private String name;
	
	@Column(name = "address", length = 100)
	private String address;
	
	@Column(name = "phone", length = 20)
	private String phone;
	
	@Column(name = "birthdate")
	private LocalDate birthdate;
	
	@Column(name = "photo")
	@Lob
	private byte[] photo;
	
	@OneToMany(mappedBy = "user")
	@JsonManagedReference
	private List<Task> tasks;

	public User() {
	}
	
	public User(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public User(Integer id, String email, String password, String name, String address, String phone,
			LocalDate birthdate, byte[] photo, List<Task> tasks) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.birthdate = birthdate;
		this.photo = photo;
		this.tasks = tasks;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
}
