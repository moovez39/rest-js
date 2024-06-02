package ru.kata.spring.boot_security.demo.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;


@Entity
@Table(name = "role")

public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;


    @Column(unique = true)
    @NotNull
    String roleName;


    @ManyToMany(mappedBy = "roles", cascade = CascadeType.MERGE)
    private List<User> users;
    public Role(String role_name) {
        this.roleName = role_name;
    }


    public long getId() {
        return id;
    }

    @Override
    public String toString() {
        return roleName;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String role_name) {
        this.roleName = role_name;
    }

    public Role() {
    }


    @Override
    public String getAuthority() {
        return roleName;
    }
}

//___________________________________________________________

