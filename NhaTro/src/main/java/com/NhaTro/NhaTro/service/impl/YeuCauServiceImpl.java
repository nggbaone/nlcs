package com.NhaTro.NhaTro.service.impl;

import com.NhaTro.NhaTro.dto.request.khach.YeuCauThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.YeuCauXoaRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietYeuCauResponse;
import com.NhaTro.NhaTro.dto.response.admin.YeuCauHienThiResponse;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;
import com.NhaTro.NhaTro.entity.*;
import com.NhaTro.NhaTro.repository.*;
import com.NhaTro.NhaTro.service.YeuCauService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class YeuCauServiceImpl implements YeuCauService {

    @Autowired
    private YeuCauRepository yeuCauRepository;

    @Autowired
    private NhaTroRepository nhaTroRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private HuyenRepository huyenRepository;

    @Autowired
    private TinhRepository tinhRepository;

    public boolean themYeuCau(YeuCauThemRequest request) {
        List<YeuCauEntity> yeuCauEntityList = yeuCauRepository.findAll();
        for (YeuCauEntity i : yeuCauEntityList) {
            if (i.getTaiKhoanEntity().getId() == request.getIdTaiKhoan() && i.getNhaTroEntity().getId() == request.getIdNhaTro()) {
                return false;
            }
        }
        YeuCauEntity yeuCauEntity = new YeuCauEntity();
        TaiKhoanEntity taiKhoanEntity = new TaiKhoanEntity();
        taiKhoanEntity.setId(request.getIdTaiKhoan());
        NhaTroEntity nhaTroEntity = new NhaTroEntity();
        nhaTroEntity.setId(request.getIdNhaTro());
        yeuCauEntity.setTaiKhoanEntity(taiKhoanEntity);
        yeuCauEntity.setNhaTroEntity(nhaTroEntity);
        yeuCauEntity.setTrangThai(1);
        entityManager.persist(yeuCauEntity);
        return true;
    }

    public List<NhaTroHienThiResponse> hienThiYeuCau(Long idTaiKhoan) {
        List<NhaTroHienThiResponse> nhaTroHienThiResponseList = new ArrayList<>();
        List<YeuCauEntity> yeuCauEntityList = yeuCauRepository.hienThi_YeuCau_idTaiKhoan(idTaiKhoan);
        for (YeuCauEntity i : yeuCauEntityList) {
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

    public List<NhaTroHienThiResponse> hienThiYeuCau1(Long idTaiKhoan) {
        List<NhaTroHienThiResponse> nhaTroHienThiResponseList = new ArrayList<>();
        List<YeuCauEntity> yeuCauEntityList = yeuCauRepository.hienThi_YeuCau_idTaiKhoan(idTaiKhoan);
        for (YeuCauEntity i : yeuCauEntityList) {
            if (i.getTrangThai() == 1) {
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
        }
        return nhaTroHienThiResponseList;
    }

    public void xoaYeuCau(YeuCauXoaRequest request) {
        yeuCauRepository.xoaYeuCau(request);
    }

    public boolean ad_XoaYeuCau(Long id) {
        yeuCauRepository.deleteById(id);
        return true;
    }

    public List<YeuCauHienThiResponse> hienThiYeuCau_Admin() {
        List<YeuCauEntity> yeuCauEntityList = yeuCauRepository.findAll();
        List<YeuCauHienThiResponse> yeuCauHienThiResponseList = new ArrayList<>();
        for (YeuCauEntity i : yeuCauEntityList) {
            if (i.getTrangThai() == 1) {
                YeuCauHienThiResponse yeuCauHienThiResponse = new YeuCauHienThiResponse();
                yeuCauHienThiResponse.setId(i.getId());
                yeuCauHienThiResponse.setId_TaiKhoan(i.getTaiKhoanEntity().getId());
                yeuCauHienThiResponse.setId_NhaTro(i.getNhaTroEntity().getId());
                Optional<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.findById(yeuCauHienThiResponse.getId_TaiKhoan());
                Optional<NhaTroEntity> nhaTroEntity = nhaTroRepository.findById(yeuCauHienThiResponse.getId_NhaTro());
                yeuCauHienThiResponse.setTenKhach(taiKhoanEntity.get().getHoTen());
                yeuCauHienThiResponse.setTenTro(nhaTroEntity.get().getTieuDe());
                yeuCauHienThiResponseList.add(yeuCauHienThiResponse);
            }
        }
        return yeuCauHienThiResponseList;
    }

    public ChiTietYeuCauResponse chiTietYeuCau(Long id) {
        Optional<YeuCauEntity> yeuCauEntity = yeuCauRepository.findById(id);
        Optional<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.findById(yeuCauEntity.get().getTaiKhoanEntity().getId());
        Optional<NhaTroEntity> nhaTroEntity = nhaTroRepository.findById(yeuCauEntity.get().getNhaTroEntity().getId());
        if (yeuCauEntity.isPresent()) {
            ChiTietYeuCauResponse response = new ChiTietYeuCauResponse();

            response.setId(yeuCauEntity.get().getId());

            response.setId_khach(yeuCauEntity.get().getTaiKhoanEntity().getId());
            response.setTen_khach(taiKhoanEntity.get().getHoTen());
            response.setDia_chi_khach(taiKhoanEntity.get().getDiaChi());
            response.setEmail(taiKhoanEntity.get().getEmail());
            response.setSo_dien_thoai(taiKhoanEntity.get().getSoDienThoai());

            response.setId_tro(yeuCauEntity.get().getNhaTroEntity().getId());
            response.setTen_tro(nhaTroEntity.get().getTieuDe());
            response.setDien_tich(nhaTroEntity.get().getDienTich());
            response.setGia_thue(nhaTroEntity.get().getGiaThue());
            response.setGia_dien(nhaTroEntity.get().getGiaDien());
            response.setGia_nuoc(nhaTroEntity.get().getGiaNuoc());
            response.setNoi_that(nhaTroEntity.get().getNoiThat());
            response.setMo_ta(nhaTroEntity.get().getMoTa());
            response.setHang(nhaTroEntity.get().getHang());

            Optional<HuyenEntity> huyenEntity = huyenRepository.findById(nhaTroEntity.get().getHuyenEntity().getId());
            Optional<TinhEntity> tinhEntity = tinhRepository.findById(huyenEntity.get().getTinhEntity().getId());
            String diachi = nhaTroEntity.get().getDiaChi() + ", "
                    + huyenEntity.get().getTenHuyen() + ", "
                    + tinhEntity.get().getTenTinh();
            response.setDia_chi_tro(diachi);

            return response;
        }
        return null;
    }

}
