package com.NhaTro.NhaTro.repository;

import com.NhaTro.NhaTro.dto.request.khach.YeuCauXoaRequest;
import com.NhaTro.NhaTro.entity.YeuCauEntity;
import com.NhaTro.NhaTro.repository.custom.YeuCauRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface YeuCauRepository extends JpaRepository<YeuCauEntity, Long>, YeuCauRepositoryCustom {

    List<YeuCauEntity> hienThi_YeuCau_idTaiKhoan(Long idTaiKhoan);
    void xoaYeuCau(YeuCauXoaRequest request);
    int doiTrangThaiYeuCau(Long id, Long x);

}
