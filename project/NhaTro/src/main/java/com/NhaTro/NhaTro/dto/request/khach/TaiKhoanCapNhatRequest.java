package com.NhaTro.NhaTro.dto.request.khach;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaiKhoanCapNhatRequest {
    private Long id;
    private String hoTen;
    private String taiKhoan;
    private String email;
    private String soDienThoai;
    private String diaChi;
}
