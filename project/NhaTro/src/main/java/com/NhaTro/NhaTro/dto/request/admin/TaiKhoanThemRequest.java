package com.NhaTro.NhaTro.dto.request.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaiKhoanThemRequest {
    private String hoTen;
    private String taiKhoan;
    private String matKhau;
    private String diaChi;
    private String email;
    private String soDienThoai;
    private Long chucVu;
}
