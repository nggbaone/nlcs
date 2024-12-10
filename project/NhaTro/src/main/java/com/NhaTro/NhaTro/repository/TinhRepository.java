package com.NhaTro.NhaTro.repository;

import com.NhaTro.NhaTro.entity.TinhEntity;
import com.NhaTro.NhaTro.repository.custom.TinhRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TinhRepository extends JpaRepository<TinhEntity, Long>, TinhRepositoryCustom {
}