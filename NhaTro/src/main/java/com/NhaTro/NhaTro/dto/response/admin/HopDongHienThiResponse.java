package com.NhaTro.NhaTro.dto.response.admin;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class HopDongHienThiResponse {
    private Long id;
    private Long id_NhaTro;
    private Long id_KhachHang;
    private String tenNhaTro;
    private String tenKhachHang;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date ngayBatDau;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date ngayKetThuc;
    private Long trangThai;
}
