package com.NhaTro.NhaTro.service.impl;

import com.NhaTro.NhaTro.dto.request.khach.YeuThichThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.YeuThichXoaRequest;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;
import com.NhaTro.NhaTro.entity.NhaTroEntity;
import com.NhaTro.NhaTro.entity.TaiKhoanEntity;
import com.NhaTro.NhaTro.entity.YeuThichEntity;
import com.NhaTro.NhaTro.repository.NhaTroRepository;
import com.NhaTro.NhaTro.repository.YeuThichRepository;
import com.NhaTro.NhaTro.service.YeuThichService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class YeuThichServiceImpl implements YeuThichService {

    @Autowired
    private YeuThichRepository yeuThichRepository;

    @Autowired
    private NhaTroRepository nhaTroRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public boolean themYeuThich(YeuThichThemRequest request) {
        List<YeuThichEntity> yeuThichEntityList = yeuThichRepository.findAll();
        for (YeuThichEntity i : yeuThichEntityList) {
            if (i.getTaiKhoanEntity().getId() == request.getId_TaiKhoan() && i.getNhaTroEntity().getId() == request.getId_NhaTro()) {
                return false;
            }
        }
        YeuThichEntity yeuThichEntity = new YeuThichEntity();
        TaiKhoanEntity taiKhoanEntity = new TaiKhoanEntity();
        taiKhoanEntity.setId(request.getId_TaiKhoan());
        NhaTroEntity nhaTroEntity = new NhaTroEntity();
        nhaTroEntity.setId(request.getId_NhaTro());
        yeuThichEntity.setTaiKhoanEntity(taiKhoanEntity);
        yeuThichEntity.setNhaTroEntity(nhaTroEntity);
        entityManager.persist(yeuThichEntity);
        return true;
    }

    public List<NhaTroHienThiResponse> hienThiYeuThich (Long idTaiKhoan) {
        List<NhaTroHienThiResponse> nhaTroHienThiResponseList = new ArrayList<>();
        List<YeuThichEntity> yeuThichEntityList = yeuThichRepository.hienThi_YeuThich_idTaiKhoan(idTaiKhoan);
        for (YeuThichEntity i : yeuThichEntityList) {
            NhaTroEntity nhaTroEntity = nhaTroRepository.hienThi_NhaTro_id(i.getNhaTroEntity().getId());
            NhaTroHienThiResponse hienThiResponse = new NhaTroHienThiResponse();
            hienThiResponse.setTieuDe(nhaTroEntity.getTieuDe());
            hienThiResponse.setDienTich(nhaTroEntity.getDienTich());
            hienThiResponse.setHang(nhaTroEntity.getHang());
            hienThiResponse.setTrangThai(nhaTroEntity.getTrangThai());
            hienThiResponse.setDiaChi(nhaTroEntity.getDiaChi());
            hienThiResponse.setGiaDien(nhaTroEntity.getGiaDien());
            hienThiResponse.setGiaNuoc(nhaTroEntity.getGiaNuoc());
            hienThiResponse.setGiaThue(nhaTroEntity.getGiaThue());
            hienThiResponse.setMoTa(nhaTroEntity.getMoTa());
            hienThiResponse.setNoiThat(nhaTroEntity.getNoiThat());
            hienThiResponse.setId(nhaTroEntity.getId());
            hienThiResponse.setHinhAnh(nhaTroEntity.getHinhAnh());
            nhaTroHienThiResponseList.add(hienThiResponse);
        }
        return nhaTroHienThiResponseList;
    }

    public void xoaYeuThich(YeuThichXoaRequest request) {
        yeuThichRepository.xoaYeuThich(request);
    }

}
