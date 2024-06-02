package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.print.DocFlavor;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class RestApi {

    private final UserService userService;

    @Autowired
    RestApi(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id){
        User user =  userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user){
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok("user with id" + id + " was deleted");
    }

    @PutMapping("/user")
    public ResponseEntity<User> editUser(@RequestBody User user){
        userService.saveUser(user);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(user);
    }
}
