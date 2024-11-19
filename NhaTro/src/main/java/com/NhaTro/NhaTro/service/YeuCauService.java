package com.NhaTro.NhaTro.service;

import com.NhaTro.NhaTro.dto.request.khach.YeuCauThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.YeuCauXoaRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietYeuCauResponse;
import com.NhaTro.NhaTro.dto.response.admin.YeuCauHienThiResponse;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;

import java.util.List;

public interface YeuCauService {

    void themYeuCau(YeuCauThemRequest request);
    List<NhaTroHienThiResponse> hienThiYeuCau (Long idTaiKhoan);
    List<NhaTroHienThiResponse> hienThiYeuCau1 (Long idTaiKhoan);
    void xoaYeuCau(YeuCauXoaRequest request);
    List<YeuCauHienThiResponse> hienThiYeuCau_Admin();
    ChiTietYeuCauResponse chiTietYeuCau(Long id);
    boolean ad_XoaYeuCau(Long id);

}
