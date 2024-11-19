package com.NhaTro.NhaTro.repository;

import com.NhaTro.NhaTro.entity.HopDongEntity;
import com.NhaTro.NhaTro.repository.custom.HopDongRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HopDongRepository extends JpaRepository<HopDongEntity, Long>, HopDongRepositoryCustom {
}
