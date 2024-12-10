package com.NhaTro.NhaTro.service;

import com.NhaTro.NhaTro.dto.request.TaiKhoanDangNhapRequest;
import com.NhaTro.NhaTro.dto.response.TokenResponse;
import com.NhaTro.NhaTro.repository.TaiKhoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final TaiKhoanRepository taiKhoanRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public TokenResponse authenticate(TaiKhoanDangNhapRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getTaiKhoan(), request.getMatKhau()));

        var user = taiKhoanRepository.findByTaiKhoan(request.getTaiKhoan()).orElseThrow(()-> new UsernameNotFoundException("taikhoan hoac matkhau khong dung"));

        String accessToken = jwtService.generateToken(user);

        String refreshToken = jwtService.generateRefreshToken(user);

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .taiKhoanId(user.getId())
                .build();
    }

}
