package com.NhaTro.NhaTro.dto.request.admin;

import com.NhaTro.NhaTro.entity.HuyenEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NhaTroThemRequest {
    private String tieuDe;
    private String diaChi;
    private long dienTich;
    private long giaThue;
    private long giaDien;
    private long giaNuoc;
    private String noiThat;
    private long hang;
    private String moTa;
    private long trangThai;
    private String hinhAnh;
    private Long huyen;
    private Long tinh;
}
