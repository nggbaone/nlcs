package com.NhaTro.NhaTro.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaiKhoanDangNhapResponse {
    private String taiKhoan;
    private String matKhau;
    private TokenResponse tokenResponse;
    private Long role;
}
