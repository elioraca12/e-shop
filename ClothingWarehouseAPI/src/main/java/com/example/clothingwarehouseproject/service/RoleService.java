package com.example.clothingwarehouseproject.service;

import com.example.clothingwarehouseproject.domain.Role;
import com.example.clothingwarehouseproject.domain.User;
import com.example.clothingwarehouseproject.repository.RoleRepository;
import com.example.clothingwarehouseproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RoleService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public void addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        log.info("saving role {} to user {} in db.", username, roleName);
        user.getRoles().add(role);
    }

    public void saveRole(Role role) {
        log.info("saving role {} to db.", role.getName());
        roleRepository.save(role);
    }

    public ResponseEntity<List<Role>> getAll(){
        return ResponseEntity.ok().body(roleRepository.findAll());
    }

    public ResponseEntity<Role> getRole(String roleName){
        return ResponseEntity.ok().body(roleRepository.findByName(roleName));
    }

}
