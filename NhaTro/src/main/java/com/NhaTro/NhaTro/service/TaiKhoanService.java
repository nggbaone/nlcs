package com.NhaTro.NhaTro.service;

import com.NhaTro.NhaTro.dto.request.TaiKhoanDangNhapRequest;
import com.NhaTro.NhaTro.dto.request.admin.CapNhatTaiKhoanRequest;
import com.NhaTro.NhaTro.dto.request.admin.TaiKhoanThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanDangKyRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanDoiMatKhauRequest;
import com.NhaTro.NhaTro.dto.response.TaiKhoanDangNhapResponse;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietTaiKhoanResponse;
import com.NhaTro.NhaTro.dto.response.admin.TaiKhoanHienThiResponse;
import com.NhaTro.NhaTro.dto.response.khach.TaiKhoanHoatDongResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface TaiKhoanService {

    UserDetailsService userDetailsService();
    void dangKyTaiKhoan(TaiKhoanDangKyRequest request);
    TaiKhoanDangNhapResponse dangNhapTaiKhoan(TaiKhoanDangNhapRequest request);
    List<TaiKhoanHienThiResponse> hienThiTaiKhoan();
    List<TaiKhoanHienThiResponse> hienThiTaiKhoan_hoTen(String hoTen);
    List<TaiKhoanHienThiResponse> hienThiTaiKhoan_taiKhoan(String taiKhoan);
    void xoaTaiKhoan(Long id);
    TaiKhoanHoatDongResponse hienThiTaiKhoan_id(Long id);
    boolean capNhatTaiKhoan(TaiKhoanCapNhatRequest request);
    boolean doiMatKhauTaiKhoan(TaiKhoanDoiMatKhauRequest request);
    boolean themTaiKhoan(TaiKhoanThemRequest request);
    ChiTietTaiKhoanResponse xemTaiKhoan(Long id);
    boolean ad_CapNhatTaiKhoan(CapNhatTaiKhoanRequest request);

}
