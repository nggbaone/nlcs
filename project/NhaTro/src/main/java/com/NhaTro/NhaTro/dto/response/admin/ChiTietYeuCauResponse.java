package com.NhaTro.NhaTro.dto.response.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChiTietYeuCauResponse {
    private Long id;

    private Long id_khach;
    private String ten_khach;
    private String dia_chi_khach;
    private String so_dien_thoai;
    private String email;

    private Long id_tro;
    private String ten_tro;
    private Long dien_tich;
    private Long gia_thue;
    private Long gia_dien;
    private Long gia_nuoc;
    private String noi_that;
    private String mo_ta;
    private String dia_chi_tro;
    private Long hang;
}
