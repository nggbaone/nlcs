package com.NhaTro.NhaTro.repository.impl;

import com.NhaTro.NhaTro.dto.request.admin.NhaTroCapNhatRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietNhaTroResponse;
import com.NhaTro.NhaTro.entity.NhaTroEntity;
import com.NhaTro.NhaTro.repository.custom.NhaTroRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class NhaTroRepositoryImpl implements NhaTroRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    public NhaTroEntity hienThi_NhaTro_id(Long id) {
        StringBuilder sql = new StringBuilder(" SELECT * FROM nha_tro ");
        StringBuilder where = new StringBuilder(" WHERE id = '");
        where.append(id).append("' ");
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString(),NhaTroEntity.class);
        try {
            return (NhaTroEntity) query.getSingleResult(); // Lấy kết quả duy nhất
        } catch (NoResultException e) {
            return null; // Trả về null nếu không có kết quả
        }
    }

    public int capNhatNhaTro(NhaTroCapNhatRequest request) {
        StringBuilder sql = new StringBuilder(" UPDATE nha_tro SET ");
        sql.append(" tieu_de = '").append(request.getTieuDe()).append("', ");
        sql.append(" dien_tich = ").append(request.getDienTich()).append(", ");
        sql.append(" gia_thue = ").append(request.getGiaThue()).append(", ");
        sql.append( "gia_dien = ").append(request.getGiaDien()).append(", ");
        sql.append(" gia_nuoc = ").append(request.getGiaNuoc()).append(", ");
        sql.append(" dia_chi = '").append(request.getDiaChi()).append("', ");
        sql.append(" noi_that = '").append(request.getNoiThat()).append("', ");
        sql.append(" hang = ").append(request.getHang()).append(", ");
        sql.append(" mo_ta = '").append(request.getMoTa()).append("', ");
        sql.append(" trang_thai = '").append(request.getTrangThai()).append("', ");
        sql.append(" id_huyen = ").append(request.getHuyen()).append(" ");
        sql.append(" WHERE id = ").append(request.getId());

        Query query = entityManager.createNativeQuery(sql.toString());
        return query.executeUpdate();
    }

}
