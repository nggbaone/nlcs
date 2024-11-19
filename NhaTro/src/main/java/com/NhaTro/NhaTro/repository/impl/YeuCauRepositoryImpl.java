package com.NhaTro.NhaTro.repository.impl;

import com.NhaTro.NhaTro.dto.request.khach.YeuCauXoaRequest;
import com.NhaTro.NhaTro.entity.YeuCauEntity;
import com.NhaTro.NhaTro.repository.custom.YeuCauRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class YeuCauRepositoryImpl implements YeuCauRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    public List<YeuCauEntity> hienThi_YeuCau_idTaiKhoan(Long idTaiKhoan) {
        StringBuilder sql = new StringBuilder(" SELECT * FROM yeu_cau ");
        StringBuilder where = new StringBuilder(" WHERE id_tai_khoan = '");
        where.append(idTaiKhoan).append("' ");
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString(), YeuCauEntity.class);
        return query.getResultList();
    }

    public void xoaYeuCau(YeuCauXoaRequest request) {
        StringBuilder sql = new StringBuilder(" DELETE FROM yeu_cau ");
        StringBuilder where = new StringBuilder(" WHERE id_tai_khoan = '");
        where.append(request.getId_TaiKhoan()).append("' AND id_nha_tro ='");
        where.append(request.getId_NhaTro()).append("'");
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString());
        query.executeUpdate();
    }

    public int doiTrangThaiYeuCau(Long id, Long x) {
        StringBuilder sql = new StringBuilder(" UPDATE yeu_cau SET ");
        sql.append(" trang_thai = ").append(x).append(" ");
        sql.append(" WHERE id = ").append(id);
        Query query = entityManager.createNativeQuery(sql.toString());
        return query.executeUpdate();
    }

}
