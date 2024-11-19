package com.NhaTro.NhaTro.service.impl;


import com.NhaTro.NhaTro.dto.request.admin.HopDongThemRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietHopDongResponse;
import com.NhaTro.NhaTro.dto.response.admin.HopDongHienThiResponse;
import com.NhaTro.NhaTro.entity.*;
import com.NhaTro.NhaTro.repository.*;
import com.NhaTro.NhaTro.service.HopDongService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class HopDongServiceImpl implements HopDongService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private HopDongRepository hopDongRepository;

    @Autowired
    private YeuCauRepository yeuCauRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private NhaTroRepository nhaTroRepository;

    @Autowired
    private HuyenRepository huyenRepository;

    @Autowired
    private TinhRepository tinhRepository;

    public List<HopDongHienThiResponse> hienThiHopDong1(){
        List<HopDongEntity> hopDongEntityList = hopDongRepository.findAll();
        List<HopDongHienThiResponse> hopDongHienThiResponseList = new ArrayList<>();
        for (HopDongEntity i : hopDongEntityList) {
            if (i.getTrangThai() == 1) {
                HopDongHienThiResponse hopDongHienThiResponse = new HopDongHienThiResponse();
                hopDongHienThiResponse.setId(i.getId());
                hopDongHienThiResponse.setId_NhaTro(i.getNhaTroEntity().getId());
                hopDongHienThiResponse.setId_KhachHang(i.getTaiKhoanEntity().getId());
                hopDongHienThiResponse.setTenNhaTro(i.getNhaTroEntity().getTieuDe());
                hopDongHienThiResponse.setTenKhachHang(i.getTaiKhoanEntity().getHoTen());
                hopDongHienThiResponse.setNgayBatDau(i.getNgayBatDau());
                hopDongHienThiResponse.setNgayKetThuc(i.getNgayKetThuc());
                hopDongHienThiResponse.setTrangThai(i.getTrangThai());
                hopDongHienThiResponseList.add(hopDongHienThiResponse);
            }
        }
        return hopDongHienThiResponseList;
    }

    public List<HopDongHienThiResponse> hienThiHopDong0(){
        List<HopDongEntity> hopDongEntityList = hopDongRepository.findAll();
        List<HopDongHienThiResponse> hopDongHienThiResponseList = new ArrayList<>();
        for (HopDongEntity i : hopDongEntityList) {
            if (i.getTrangThai() == 0) {
                HopDongHienThiResponse hopDongHienThiResponse = new HopDongHienThiResponse();
                hopDongHienThiResponse.setId(i.getId());
                hopDongHienThiResponse.setId_NhaTro(i.getNhaTroEntity().getId());
                hopDongHienThiResponse.setId_KhachHang(i.getTaiKhoanEntity().getId());
                hopDongHienThiResponse.setTenNhaTro(i.getNhaTroEntity().getTieuDe());
                hopDongHienThiResponse.setTenKhachHang(i.getTaiKhoanEntity().getHoTen());
                hopDongHienThiResponse.setNgayBatDau(i.getNgayBatDau());
                hopDongHienThiResponse.setNgayKetThuc(i.getNgayKetThuc());
                hopDongHienThiResponse.setTrangThai(i.getTrangThai());
                hopDongHienThiResponseList.add(hopDongHienThiResponse);
            }
        }
        return hopDongHienThiResponseList;
    }

    public List<HopDongHienThiResponse> hetHanHopDong() {
        List<HopDongEntity> hopDongEntityList = hopDongRepository.findAll();
        List<HopDongHienThiResponse> hopDongHienThiResponseList = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (HopDongEntity i : hopDongEntityList) {
            LocalDate ngayKetThuc = i.getNgayKetThuc().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if (ngayKetThuc.isBefore(today)) {
                HopDongHienThiResponse hopDongHienThiResponse = new HopDongHienThiResponse();
                hopDongHienThiResponse.setId(i.getId());
                hopDongHienThiResponse.setId_NhaTro(i.getNhaTroEntity().getId());
                hopDongHienThiResponse.setId_KhachHang(i.getTaiKhoanEntity().getId());
                hopDongHienThiResponse.setTenNhaTro(i.getNhaTroEntity().getTieuDe());
                hopDongHienThiResponse.setTenKhachHang(i.getTaiKhoanEntity().getHoTen());
                hopDongHienThiResponse.setNgayBatDau(i.getNgayBatDau());
                hopDongHienThiResponse.setNgayKetThuc(i.getNgayKetThuc());
                hopDongHienThiResponse.setTrangThai(i.getTrangThai());
                hopDongHienThiResponseList.add(hopDongHienThiResponse);
            }
        }
        return hopDongHienThiResponseList;
    }

    public List<HopDongHienThiResponse> conHanHopDong() {
        List<HopDongEntity> hopDongEntityList = hopDongRepository.findAll();
        List<HopDongHienThiResponse> hopDongHienThiResponseList = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (HopDongEntity i : hopDongEntityList) {
            LocalDate ngayKetThuc = i.getNgayKetThuc().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if (ngayKetThuc.isAfter(today)) {
                HopDongHienThiResponse hopDongHienThiResponse = new HopDongHienThiResponse();
                hopDongHienThiResponse.setId(i.getId());
                hopDongHienThiResponse.setId_NhaTro(i.getNhaTroEntity().getId());
                hopDongHienThiResponse.setId_KhachHang(i.getTaiKhoanEntity().getId());
                hopDongHienThiResponse.setTenNhaTro(i.getNhaTroEntity().getTieuDe());
                hopDongHienThiResponse.setTenKhachHang(i.getTaiKhoanEntity().getHoTen());
                hopDongHienThiResponse.setNgayBatDau(i.getNgayBatDau());
                hopDongHienThiResponse.setNgayKetThuc(i.getNgayKetThuc());
                hopDongHienThiResponse.setTrangThai(i.getTrangThai());
                hopDongHienThiResponseList.add(hopDongHienThiResponse);
            }
        }
        return hopDongHienThiResponseList;
    }

    public boolean themHopDong(HopDongThemRequest request) {
        Optional<YeuCauEntity> yeuCauEntity = yeuCauRepository.findById(request.getId_YeuCau());
        if (yeuCauEntity.isPresent()) {
            Optional<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.findById(yeuCauEntity.get().getTaiKhoanEntity().getId());
            Optional<NhaTroEntity> nhaTroEntity = nhaTroRepository.findById(yeuCauEntity.get().getNhaTroEntity().getId());
            HopDongEntity hopDongEntity = new HopDongEntity();
            hopDongEntity.setTaiKhoanEntity(taiKhoanEntity.get());
            hopDongEntity.setNhaTroEntity(nhaTroEntity.get());
            hopDongEntity.setNgayBatDau(request.getNgay_bat_dau());
            hopDongEntity.setNgayKetThuc(request.getNgay_ket_thuc());
            hopDongEntity.setTrangThai(1L);
            entityManager.persist(hopDongEntity);
            int check = yeuCauRepository.doiTrangThaiYeuCau(yeuCauEntity.get().getId(), 0L);
            return true;
        }
        return false;
    }

    public ChiTietHopDongResponse chiTietHopDong(Long id) {
        Optional<HopDongEntity> hopDongEntity = hopDongRepository.findById(id);
        if (hopDongEntity.isPresent()) {
            Optional<NhaTroEntity> nhaTroEntity = nhaTroRepository.findById(hopDongEntity.get().getNhaTroEntity().getId());
            Optional<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.findById(hopDongEntity.get().getTaiKhoanEntity().getId());
            ChiTietHopDongResponse response = new ChiTietHopDongResponse();
            response.setId(hopDongEntity.get().getId());
            response.setNgayBatDau(hopDongEntity.get().getNgayBatDau());
            response.setNgayKetThuc(hopDongEntity.get().getNgayKetThuc());

            response.setId_khach(taiKhoanEntity.get().getId());
            response.setTen_khach(taiKhoanEntity.get().getHoTen());
            response.setDia_chi_khach(taiKhoanEntity.get().getDiaChi());
            response.setSo_dien_thoai(taiKhoanEntity.get().getSoDienThoai());
            response.setEmail(taiKhoanEntity.get().getEmail());

            response.setId_tro(nhaTroEntity.get().getId());
            response.setTen_tro(nhaTroEntity.get().getTieuDe());
            response.setDien_tich(nhaTroEntity.get().getDienTich());
            response.setGia_thue(nhaTroEntity.get().getGiaThue());
            response.setGia_dien(nhaTroEntity.get().getGiaDien());
            response.setGia_nuoc(nhaTroEntity.get().getGiaNuoc());
            response.setNoi_that(nhaTroEntity.get().getNoiThat());
            response.setHang(nhaTroEntity.get().getHang());
            response.setMo_ta(nhaTroEntity.get().getMoTa());
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

    public boolean xoaHopDong(Long id) {
        Optional<HopDongEntity> hopDongEntity = hopDongRepository.findById(id);
        if (hopDongEntity.isPresent()) {
            hopDongRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<HopDongHienThiResponse> dangThueHopDong(Long id) {
        List<HopDongEntity> hopDongEntityList = hopDongRepository.findAll();
        List<HopDongHienThiResponse> hopDongHienThiResponseList = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (HopDongEntity i : hopDongEntityList) {
            LocalDate ngayKetThuc = i.getNgayKetThuc().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if (i.getTaiKhoanEntity().getId() == id && ngayKetThuc.isAfter(today)) {
                HopDongHienThiResponse hopDongHienThiResponse = new HopDongHienThiResponse();
                hopDongHienThiResponse.setId(i.getId());
                hopDongHienThiResponse.setId_NhaTro(i.getNhaTroEntity().getId());
                hopDongHienThiResponse.setId_KhachHang(i.getTaiKhoanEntity().getId());
                hopDongHienThiResponse.setTenNhaTro(i.getNhaTroEntity().getTieuDe());
                hopDongHienThiResponse.setTenKhachHang(i.getTaiKhoanEntity().getHoTen());
                hopDongHienThiResponse.setNgayBatDau(i.getNgayBatDau());
                hopDongHienThiResponse.setNgayKetThuc(i.getNgayKetThuc());
                hopDongHienThiResponse.setTrangThai(i.getTrangThai());
                hopDongHienThiResponseList.add(hopDongHienThiResponse);
            }
        }
        return hopDongHienThiResponseList;
    }

    public List<HopDongHienThiResponse> daThueHopDong(Long id) {
        List<HopDongEntity> hopDongEntityList = hopDongRepository.findAll();
        List<HopDongHienThiResponse> hopDongHienThiResponseList = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (HopDongEntity i : hopDongEntityList) {
            LocalDate ngayKetThuc = i.getNgayKetThuc().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if (i.getTaiKhoanEntity().getId() == id && ngayKetThuc.isBefore(today)) {
                HopDongHienThiResponse hopDongHienThiResponse = new HopDongHienThiResponse();
                hopDongHienThiResponse.setId(i.getId());
                hopDongHienThiResponse.setId_NhaTro(i.getNhaTroEntity().getId());
                hopDongHienThiResponse.setId_KhachHang(i.getTaiKhoanEntity().getId());
                hopDongHienThiResponse.setTenNhaTro(i.getNhaTroEntity().getTieuDe());
                hopDongHienThiResponse.setTenKhachHang(i.getTaiKhoanEntity().getHoTen());
                hopDongHienThiResponse.setNgayBatDau(i.getNgayBatDau());
                hopDongHienThiResponse.setNgayKetThuc(i.getNgayKetThuc());
                hopDongHienThiResponse.setTrangThai(i.getTrangThai());
                hopDongHienThiResponseList.add(hopDongHienThiResponse);
            }
        }
        return hopDongHienThiResponseList;
    }

}
