package com.NhaTro.NhaTro.repository;

import com.NhaTro.NhaTro.dto.request.admin.NhaTroCapNhatRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietNhaTroResponse;
import com.NhaTro.NhaTro.entity.NhaTroEntity;
import com.NhaTro.NhaTro.repository.custom.NhaTroRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NhaTroRepository extends JpaRepository<NhaTroEntity, Long>, NhaTroRepositoryCustom {

    NhaTroEntity hienThi_NhaTro_id(Long id);
    int capNhatNhaTro(NhaTroCapNhatRequest request);

}
