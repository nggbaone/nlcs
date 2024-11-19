package com.NhaTro.NhaTro.service;

import com.NhaTro.NhaTro.dto.request.khach.YeuThichThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.YeuThichXoaRequest;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;

import java.util.List;

public interface YeuThichService {

    void themYeuThich(YeuThichThemRequest request);
    List<NhaTroHienThiResponse> hienThiYeuThich (Long idTaiKhoan);
    void xoaYeuThich(YeuThichXoaRequest request);

}
