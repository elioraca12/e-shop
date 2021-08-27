package com.example.clothingwarehouseproject.service;

import com.example.clothingwarehouseproject.domain.User;
import com.example.clothingwarehouseproject.repository.RoleRepository;
import com.example.clothingwarehouseproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null){
            log.error("User not found");
            throw new UsernameNotFoundException("User not in the database");
        }
        else{
            log.info("User found");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    public User getUserById(long id){
        User user = userRepository.findById(id);

        if (user == null){
            log.error("User with {} not found", id);
        }
        else {
            log.info("User exists");
        }
        return user;
    }

    public User getUserByUsername(String username){
        User user = userRepository.findByUsername(username);

        if (user == null){
            log.error("User with username {} not found", username);
        }
        else {
            log.info("User exists");
        }
        return user;
    }

    public User saveUser(User user){
        log.info("saving user to db");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singleton(roleRepository.findByName("ROLE_USER")));
        return userRepository.save(user);
    }

    public User deleteUserByUsername(String username){
        User user = userRepository.findByUsername(username);
        if (user == null){
            log.error("user don't exists");
        }
        else{
            log.info("deleting user from db");
            userRepository.deleteUserByUsername(username);
        }
        return user;
    }

    public User deleteUserById(long id){
        User user = userRepository.findById(id);
        if (user == null){
            log.error("user don't exists");
        }
        else{
            log.info("deleting user from db");
            userRepository.deleteUserById(id);
        }
        return user;
    }

    public User updateUserById(long oldId, User newUser) {
        User oldUser = userRepository.findById(oldId);
        if (oldUser == null) {
            log.error("user don't exists");
        } else {
            log.info("updating user on db");
            oldUser.setUsername(newUser.getUsername());
            oldUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            oldUser.setFirstname(newUser.getFirstname());
            oldUser.setLastname(newUser.getLastname());
            oldUser.setEmail(newUser.getEmail());
            oldUser.setRoles(newUser.getRoles());
            userRepository.save(oldUser);
        }
        return newUser;
    }

    public User updateUserByUsername(String username, User newUser){
        User oldUser = userRepository.findByUsername(username);
        if (oldUser == null){
            log.error("user don't exists");
        }
        else{
            log.info("updating user on db");
            oldUser.setUsername(newUser.getUsername());
            oldUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            oldUser.setFirstname(newUser.getFirstname());
            oldUser.setLastname(newUser.getLastname());
            oldUser.setEmail(newUser.getEmail());
            oldUser.setRoles(newUser.getRoles());
            userRepository.save(oldUser);
        }
        return newUser;
    }

}
