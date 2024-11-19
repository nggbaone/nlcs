package com.NhaTro.NhaTro.repository.impl;

import com.NhaTro.NhaTro.dto.request.admin.CapNhatTaiKhoanRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanDoiMatKhauRequest;
import com.NhaTro.NhaTro.entity.TaiKhoanEntity;
import com.NhaTro.NhaTro.repository.custom.TaiKhoanRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaiKhoanRepositoryImpl implements TaiKhoanRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    public List<TaiKhoanEntity> hienThi_TaiKhoan_hoTen(String hoTenRequest){
        StringBuilder sql = new StringBuilder(" SELECT * FROM tai_khoan ");
        StringBuilder where = new StringBuilder(" WHERE ho_ten = '");
        where.append(hoTenRequest).append("' ");
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString(),TaiKhoanEntity.class);
        return query.getResultList();
    }

    public List<TaiKhoanEntity> hienThi_TaiKhoan_taiKhoan(String taiKhoanRequest){
        StringBuilder sql = new StringBuilder(" SELECT * FROM tai_khoan ");
        StringBuilder where = new StringBuilder(" WHERE tai_khoan = '");
        where.append(taiKhoanRequest).append("' ");
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString(),TaiKhoanEntity.class);
        return query.getResultList();
    }

    public int capNhatTaiKhoan(TaiKhoanCapNhatRequest request) {
        StringBuilder sql = new StringBuilder(" UPDATE tai_khoan SET ");
        sql.append(" ho_ten = '").append(request.getHoTen()).append("', ");
        sql.append(" email = '").append(request.getEmail()).append("', ");
        sql.append(" so_dien_thoai = '").append(request.getSoDienThoai()).append("', ");
        sql.append(" dia_chi = '").append(request.getDiaChi()).append("' ");
        sql.append(" WHERE id = ").append(request.getId());

        Query query = entityManager.createNativeQuery(sql.toString());
        return query.executeUpdate(); // Trả về số dòng bị ảnh hưởng
    }

    public int doiMatKhauTaiKhoan(TaiKhoanDoiMatKhauRequest request) {
        StringBuilder sql = new StringBuilder(" UPDATE tai_khoan SET ");
        sql.append(" mat_khau = '").append(request.getMatKhauMoi1()).append("' ");
        sql.append(" WHERE id = ").append(request.getId());
        Query query = entityManager.createNativeQuery(sql.toString());
        return query.executeUpdate(); // Trả về số dòng bị ảnh hưởng
    }

    public int ad_CapNhatTaiKhoan(CapNhatTaiKhoanRequest request) {
        StringBuilder sql = new StringBuilder(" UPDATE tai_khoan SET ");
        sql.append(" ho_ten = '").append(request.getHoTen()).append("', ");
        sql.append(" tai_khoan = '").append(request.getTaiKhoan()).append("', ");
        sql.append(" mat_khau = '").append(request.getMatKhau()).append("', ");
        sql.append(" email = '").append(request.getEmail()).append("', ");
        sql.append(" so_dien_thoai = '").append(request.getSoDienThoai()).append("', ");
        sql.append(" dia_chi = '").append(request.getDiaChi()).append("', ");
        sql.append(" trang_thai = '").append(request.getTrangThai()).append("', ");
        sql.append(" id_loai_tai_khoan = '").append(request.getChucVu()).append("' ");
        sql.append(" WHERE id = ").append(request.getId());

        Query query = entityManager.createNativeQuery(sql.toString());
        return query.executeUpdate();
    }

}
