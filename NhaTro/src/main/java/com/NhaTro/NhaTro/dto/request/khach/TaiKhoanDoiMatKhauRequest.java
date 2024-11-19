package com.NhaTro.NhaTro.dto.request.khach;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaiKhoanDoiMatKhauRequest {
    private Long id;
    private String matKhauHienTai;
    private String matKhauMoi1;
    private String matKhauMoi2;
}
