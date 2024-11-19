package com.NhaTro.NhaTro.dto.request.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CapNhatTaiKhoanRequest {
    private Long id;
    private String hoTen;
    private String taiKhoan;
    private String matKhau;
    private String email;
    private String soDienThoai;
    private String diaChi;
    private Long chucVu;
    private Long trangThai;
}
