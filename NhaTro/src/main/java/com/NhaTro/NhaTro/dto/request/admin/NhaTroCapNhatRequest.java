package com.NhaTro.NhaTro.dto.request.admin;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NhaTroCapNhatRequest {
    private long id;
    private String tieuDe;
    private String diaChi;
    private long dienTich;
    private long giaThue;
    private long giaDien;
    private long giaNuoc;
    private String noiThat;
    private long hang;
    private String moTa;
    private Long tinh;
    private Long huyen;
    private long trangThai;
    private String hinhAnh;
}
