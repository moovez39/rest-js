package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.model.UserEditDTO;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserServiceImpl userService;
    private final RoleRepository roleRepo;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleRepository roleRepo) {
        this.userService = userService;
        this.roleRepo = roleRepo;
    }


    @GetMapping("")
    public String adminPage(Model model, Principal principal) {
        model.addAttribute("authorizedUser",userService.findUserByUsername(principal.getName()));
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("roles", roleRepo.findAll());
        model.addAttribute("new_user", new User());
        model.addAttribute("usersForm", new UserEditDTO(userService.getAllUsers()));

        return "view/admin";
    }


    @PostMapping("/edit_user")
    public String editUser( Model model, @ModelAttribute UserEditDTO userEditDTO) {
        userService.saveAllUsers(userEditDTO.getUsers());
        model.addAttribute("roles", roleRepo.findAll());
        return "redirect:/admin/";

    }

    @PostMapping("/remove_user")
    public String removeUser(@ModelAttribute UserEditDTO userEditDTO) {
        userService.deleteAllUsers(userEditDTO.getUsers());
        return "redirect:/admin/";
    }

    @PostMapping("/create_user")
    public String createUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        System.out.println(user);
        return "redirect:/admin/";
    }
}
