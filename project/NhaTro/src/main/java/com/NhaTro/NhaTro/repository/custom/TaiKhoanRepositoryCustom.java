package com.NhaTro.NhaTro.repository.custom;

import com.NhaTro.NhaTro.entity.TaiKhoanEntity;

import java.util.List;

public interface TaiKhoanRepositoryCustom {
    List<TaiKhoanEntity> hienThi_TaiKhoan_hoTen(String hoTen);
    List<TaiKhoanEntity> hienThi_TaiKhoan_taiKhoan(String taiKhoan);
}
