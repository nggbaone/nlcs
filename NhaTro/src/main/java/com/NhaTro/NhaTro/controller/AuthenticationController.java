package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.request.TaiKhoanDangNhapRequest;
import com.NhaTro.NhaTro.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Slf4j
@Validated
@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication Controller")
@RequiredArgsConstructor
@Transactional
@CrossOrigin(origins = "*")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/access")
    public ResponseEntity login(@RequestBody TaiKhoanDangNhapRequest request) {
        return new ResponseEntity<>(authenticationService.authenticate(request), HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public String refresh() {
        // TODO gọi service JWT service
        return "success";
    }

    @PostMapping("/logout")
    public String logout() {
        // TODO gọi service JWT service
        return "success";
    }

}
