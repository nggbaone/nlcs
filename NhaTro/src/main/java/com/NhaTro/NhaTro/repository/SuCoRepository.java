package com.NhaTro.NhaTro.repository;

import com.NhaTro.NhaTro.entity.SuCoEntity;
import com.NhaTro.NhaTro.repository.custom.SuCoRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuCoRepository extends JpaRepository<SuCoEntity, Long>, SuCoRepositoryCustom {
}
