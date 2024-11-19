package com.NhaTro.NhaTro.repository;

import com.NhaTro.NhaTro.dto.request.khach.YeuThichXoaRequest;
import com.NhaTro.NhaTro.entity.YeuThichEntity;
import com.NhaTro.NhaTro.repository.custom.YeuThichRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface YeuThichRepository extends JpaRepository<YeuThichEntity, Long>, YeuThichRepositoryCustom {

    List<YeuThichEntity> hienThi_YeuThich_idTaiKhoan(Long idTaiKhoan);
    void xoaYeuThich(YeuThichXoaRequest request);
    
}
