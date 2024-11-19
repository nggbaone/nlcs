package com.NhaTro.NhaTro.dto.response.admin;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ChiTietHopDongResponse {
    private Long id;
    private Date ngayBatDau;
    private Date ngayKetThuc;

    private Long id_tro;
    private String ten_tro;
    private Long dien_tich;
    private Long gia_thue;
    private Long gia_dien;
    private Long gia_nuoc;
    private String noi_that;
    private Long hang;
    private String mo_ta;
    private String dia_chi_tro;

    private Long id_khach;
    private String ten_khach;
    private String dia_chi_khach;
    private String so_dien_thoai;
    private String email;
}
