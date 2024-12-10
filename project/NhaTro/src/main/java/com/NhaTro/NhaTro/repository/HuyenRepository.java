package com.NhaTro.NhaTro.repository;

import com.NhaTro.NhaTro.entity.HuyenEntity;
import com.NhaTro.NhaTro.repository.custom.HuyenRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HuyenRepository extends JpaRepository<HuyenEntity, Long>, HuyenRepositoryCustom {

    List<HuyenEntity> hienThi_Huyen_IdTinh(Long idTinh);

}
