package com.NhaTro.NhaTro.repository;

import com.NhaTro.NhaTro.dto.request.admin.CapNhatTaiKhoanRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanDoiMatKhauRequest;
import com.NhaTro.NhaTro.entity.TaiKhoanEntity;
import com.NhaTro.NhaTro.repository.custom.TaiKhoanRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoanEntity, Long>, TaiKhoanRepositoryCustom {

    Optional<TaiKhoanEntity> findByTaiKhoan(String taikhoan);
    int capNhatTaiKhoan(TaiKhoanCapNhatRequest request);
    int doiMatKhauTaiKhoan(TaiKhoanDoiMatKhauRequest request);
    int ad_CapNhatTaiKhoan(CapNhatTaiKhoanRequest request);
}
