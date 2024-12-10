package com.NhaTro.NhaTro.service;

import com.NhaTro.NhaTro.dto.request.admin.NhaTroCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.admin.NhaTroThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.NhaTroTimKiemRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietNhaTroResponse;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;
import com.NhaTro.NhaTro.entity.NhaTroEntity;

import java.util.List;

public interface NhaTroService {

    List<NhaTroHienThiResponse> hienThiNhaTro();
    NhaTroEntity hienThiNhaTro_Id(Long id);
    NhaTroHienThiResponse hienThiNhaTro_Id_ChiTiet(Long id);
    void themNhaTro(NhaTroThemRequest request);
    boolean xoaNhaTro(Long id);
    ChiTietNhaTroResponse chiTietNhaTro_Id(Long id);
    boolean capNhatNhaTro(NhaTroCapNhatRequest request);
    List<NhaTroHienThiResponse> timKiemNhaTro(NhaTroTimKiemRequest request);
    List<NhaTroHienThiResponse> hienThiNhaTro1();

}
