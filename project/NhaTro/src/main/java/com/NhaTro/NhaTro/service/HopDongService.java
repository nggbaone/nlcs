package com.NhaTro.NhaTro.service;

import com.NhaTro.NhaTro.dto.request.admin.HopDongThemRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietHopDongResponse;
import com.NhaTro.NhaTro.dto.response.admin.HopDongHienThiResponse;

import java.util.List;

public interface HopDongService {

    List<HopDongHienThiResponse> hienThiHopDong1();
    List<HopDongHienThiResponse> hienThiHopDong0();
    boolean themHopDong(HopDongThemRequest request);
    ChiTietHopDongResponse chiTietHopDong(Long id);
    boolean xoaHopDong(Long id);
    List<HopDongHienThiResponse> hetHanHopDong();
    List<HopDongHienThiResponse> conHanHopDong();
    List<HopDongHienThiResponse> dangThueHopDong(Long id);
    List<HopDongHienThiResponse> daThueHopDong(Long id);

}