package com.NhaTro.NhaTro.repository.impl;

import com.NhaTro.NhaTro.dto.request.admin.NhaTroCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.khach.NhaTroTimKiemRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietNhaTroResponse;
import com.NhaTro.NhaTro.entity.NhaTroEntity;
import com.NhaTro.NhaTro.repository.custom.NhaTroRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

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
        sql.append(" hinh_anh = '").append(request.getHinhAnh()).append("', ");
        sql.append(" id_huyen = ").append(request.getHuyen()).append(" ");
        sql.append(" WHERE id = ").append(request.getId());

        Query query = entityManager.createNativeQuery(sql.toString());
        return query.executeUpdate();
    }

//    public static void joinTable(NhaTroTimKiemRequest request, StringBuilder sql) {
//
//    }
//
//    public static void queryNomal(NhaTroTimKiemRequest request, StringBuilder where) {
//        try {
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    public static void querySpecial(NhaTroTimKiemRequest request, StringBuilder where) {
//
//    }

    public List<NhaTroEntity> timKiemNhaTro(NhaTroTimKiemRequest request) {
        StringBuilder sql = new StringBuilder(" SELECT * FROM nha_tro ");
        StringBuilder where = new StringBuilder(" WHERE 1 = 1 ");
        if (request.getTieuDe() != null) {
            where.append(" AND tieu_de = '").append(request.getTieuDe()).append("' ");
        }
        if (request.getDienTich() != null) {
            where.append(" AND dien_tich = ").append(request.getDienTich()).append(" ");
        }
        if (request.getHang() != null) {
            where.append(" AND hang = ").append(request.getHang()).append(" ");
        }
        if (request.getHuyen() != null) {
            where.append(" AND id_huyen = ").append(request.getHuyen()).append(" ");
        }
        Long giaTu = 0L;
        Long giaDen = 1000000000L;
        if (request.getGiaTu() != null) {
            giaTu = request.getGiaTu();
        }
        if (request.getGiaDen() != null) {
            giaDen = request.getGiaDen();
        }
        where.append(" AND gia_thue >= ").append(giaTu).append(" ");
        where.append(" AND gia_thue <= ").append(giaDen).append(" ");
//        where.append(" AND gia_thue BETWEEN ").append(giaTu).append(" AND ").append(giaDen);
//        where.append(" GROUP BY nha_tro.id ");
        sql.append(where);
        // khi dùng đoạn dưới câu select phải có các thuộc tính trong Entity nó mới chạy
        Query query = entityManager.createNativeQuery(sql.toString(),NhaTroEntity.class);
        return query.getResultList();
    }

}
