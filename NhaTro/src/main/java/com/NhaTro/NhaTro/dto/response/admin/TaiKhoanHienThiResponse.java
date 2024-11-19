package com.NhaTro.NhaTro.dto.response.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaiKhoanHienThiResponse {
    private long id;
    private String hoTen;
    private String taiKhoan;
    private String matKhau;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private long trangThai;
    private long chucVu;
}
