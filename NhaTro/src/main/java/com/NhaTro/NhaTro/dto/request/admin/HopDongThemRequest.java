package com.NhaTro.NhaTro.dto.request.admin;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class HopDongThemRequest {
    private Long id_YeuCau;
    private Date ngay_bat_dau;
    private Date ngay_ket_thuc;
}
