package com.NhaTro.NhaTro.repository.impl;

import com.NhaTro.NhaTro.dto.request.khach.YeuThichXoaRequest;
import com.NhaTro.NhaTro.entity.YeuThichEntity;
import com.NhaTro.NhaTro.repository.custom.YeuThichRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class YeuThichRepositoryImpl implements YeuThichRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    public List<YeuThichEntity> hienThi_YeuThich_idTaiKhoan(Long idTaiKhoan) {
        StringBuilder sql = new StringBuilder(" SELECT * FROM yeu_thich ");
        StringBuilder where = new StringBuilder(" WHERE id_tai_khoan = '");
        where.append(idTaiKhoan).append("' ");
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString(), YeuThichEntity.class);
        return query.getResultList();
    }

    public void xoaYeuThich(YeuThichXoaRequest request) {
        StringBuilder sql = new StringBuilder(" DELETE FROM yeu_thich ");
        StringBuilder where = new StringBuilder(" WHERE id_tai_khoan = '");
        where.append(request.getId_TaiKhoan()).append("' AND id_nha_tro ='");
        where.append(request.getId_NhaTro()).append("'");
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString());
        query.executeUpdate();
    }

}
