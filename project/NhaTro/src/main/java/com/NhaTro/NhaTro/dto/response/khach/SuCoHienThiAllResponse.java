package com.NhaTro.NhaTro.dto.response.khach;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SuCoHienThiAllResponse {
    private Long id;
    private String ten_Khach;
    private String ten_Tro;
    private Date ngayGui;
    private Long trangThai;
    private String noiDung;
    private String hinhAnh;
}
