package com.NhaTro.NhaTro.dto.request.khach;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NhaTroTimKiemRequest {
    private String tieuDe;
    private Long giaTu;
    private Long giaDen;
    private Long dienTich;
    private Long hang;
    private Long huyen;
}
