package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public class CreatePersonDTO {
    private String username;
    private String password;
    private String sex;
    private String email;
    private List<Role> roles;
}
