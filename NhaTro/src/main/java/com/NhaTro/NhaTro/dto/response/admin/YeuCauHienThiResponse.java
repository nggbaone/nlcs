package com.NhaTro.NhaTro.dto.response.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class YeuCauHienThiResponse {
    private Long id;
    private Long id_TaiKhoan;
    private Long id_NhaTro;
    private String tenKhach;
    private String tenTro;
}
