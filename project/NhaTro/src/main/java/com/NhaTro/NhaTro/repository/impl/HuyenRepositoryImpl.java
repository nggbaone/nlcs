package com.NhaTro.NhaTro.repository.impl;

import com.NhaTro.NhaTro.entity.HuyenEntity;
import com.NhaTro.NhaTro.repository.custom.HuyenRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HuyenRepositoryImpl implements HuyenRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    public List<HuyenEntity> hienThi_Huyen_IdTinh(Long idTinh) {
        StringBuilder sql = new StringBuilder(" SELECT * FROM huyen ");
        StringBuilder where = new StringBuilder(" WHERE id_tinh = '");
        where.append(idTinh).append("' ");
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString(),HuyenEntity.class);
        return query.getResultList();
    }

}
