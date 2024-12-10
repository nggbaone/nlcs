package com.NhaTro.NhaTro.service.impl;

import com.NhaTro.NhaTro.dto.request.admin.NhaTroCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.admin.NhaTroThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.NhaTroTimKiemRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietNhaTroResponse;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;
import com.NhaTro.NhaTro.entity.HopDongEntity;
import com.NhaTro.NhaTro.entity.HuyenEntity;
import com.NhaTro.NhaTro.entity.NhaTroEntity;
import com.NhaTro.NhaTro.entity.TinhEntity;
import com.NhaTro.NhaTro.repository.HopDongRepository;
import com.NhaTro.NhaTro.repository.HuyenRepository;
import com.NhaTro.NhaTro.repository.NhaTroRepository;
import com.NhaTro.NhaTro.repository.TinhRepository;
import com.NhaTro.NhaTro.service.NhaTroService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NhaTroServiceImpl implements NhaTroService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private NhaTroRepository nhaTroRepository;

    @Autowired
    private TinhRepository tinhRepository;

    @Autowired
    private HuyenRepository huyenRepository;
    @Autowired
    private HopDongRepository hopDongRepository;

    public List<NhaTroHienThiResponse> hienThiNhaTro(){
        List<NhaTroEntity> nhaTroEntityList = nhaTroRepository.findAll();
        List<NhaTroHienThiResponse> hienThiResponseList = new ArrayList<>();
        for (NhaTroEntity nhaTroEntity : nhaTroEntityList) {
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
            hienThiResponseList.add(hienThiResponse);
            hienThiResponse.setId(nhaTroEntity.getId());
            hienThiResponse.setHinhAnh(nhaTroEntity.getHinhAnh());
        }
        return hienThiResponseList;
    }

    public List<NhaTroHienThiResponse> hienThiNhaTro1(){
        List<NhaTroEntity> nhaTroEntityList = nhaTroRepository.findAll();
        List<NhaTroHienThiResponse> hienThiResponseList = new ArrayList<>();
        for (NhaTroEntity nhaTroEntity : nhaTroEntityList) {
            if (nhaTroEntity.getTrangThai() == 1) {
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
                hienThiResponseList.add(hienThiResponse);
                hienThiResponse.setId(nhaTroEntity.getId());
                hienThiResponse.setHinhAnh(nhaTroEntity.getHinhAnh());
            }
        }
        return hienThiResponseList;
    }

    public NhaTroEntity hienThiNhaTro_Id(Long id){
        return nhaTroRepository.hienThi_NhaTro_id(id);
    }

    public NhaTroHienThiResponse hienThiNhaTro_Id_ChiTiet(Long id){
        NhaTroEntity nhaTroEntity = nhaTroRepository.hienThi_NhaTro_id(id);
        NhaTroHienThiResponse hienThiResponse = new NhaTroHienThiResponse();
        hienThiResponse.setTieuDe(nhaTroEntity.getTieuDe());
        hienThiResponse.setDienTich(nhaTroEntity.getDienTich());
        hienThiResponse.setHang(nhaTroEntity.getHang());
        hienThiResponse.setTrangThai(nhaTroEntity.getTrangThai());
        HuyenEntity huyenEntity = huyenRepository.findById(nhaTroEntity.getHuyenEntity().getId()).get();
        TinhEntity tinhEntity = tinhRepository.findById(huyenEntity.getTinhEntity().getId()).get();
        String diaChi = nhaTroEntity.getDiaChi() + ", " + huyenEntity.getTenHuyen() + ", " + tinhEntity.getTenTinh();
        hienThiResponse.setDiaChi(diaChi);
        hienThiResponse.setGiaDien(nhaTroEntity.getGiaDien());
        hienThiResponse.setGiaNuoc(nhaTroEntity.getGiaNuoc());
        hienThiResponse.setGiaThue(nhaTroEntity.getGiaThue());
        hienThiResponse.setMoTa(nhaTroEntity.getMoTa());
        hienThiResponse.setNoiThat(nhaTroEntity.getNoiThat());
        hienThiResponse.setId(nhaTroEntity.getId());
        hienThiResponse.setHinhAnh(nhaTroEntity.getHinhAnh());
        return hienThiResponse;
    }

    public void themNhaTro(NhaTroThemRequest request) {
        NhaTroEntity nhaTroEntity = new NhaTroEntity();
        nhaTroEntity.setTieuDe(request.getTieuDe());
        nhaTroEntity.setDienTich(request.getDienTich());
        nhaTroEntity.setHang(request.getHang());
        nhaTroEntity.setTrangThai(request.getTrangThai());
        nhaTroEntity.setDiaChi(request.getDiaChi());
        nhaTroEntity.setGiaDien(request.getGiaDien());
        nhaTroEntity.setGiaNuoc(request.getGiaNuoc());
        nhaTroEntity.setGiaThue(request.getGiaThue());
        nhaTroEntity.setMoTa(request.getMoTa());
        nhaTroEntity.setNoiThat(request.getNoiThat());
        nhaTroEntity.setHinhAnh(request.getHinhAnh());
        nhaTroEntity.setTrangThai(1L);

        List<HuyenEntity> huyenEntityList = huyenRepository.findAll();
        for (HuyenEntity huyenEntity : huyenEntityList) {
            if (huyenEntity.getId() == request.getTinh()) {
                nhaTroEntity.setHuyenEntity(huyenEntity);
            }
        }

        entityManager.persist(nhaTroEntity);
    }

    public boolean xoaNhaTro(Long id) {
        List<HopDongEntity> hopDongEntityList = hopDongRepository.findAll();
        for (HopDongEntity i : hopDongEntityList) {
            if (i.getNhaTroEntity().getId() == id) {
                return false;
            }
        }
        Optional<NhaTroEntity> nhaTroEntity = nhaTroRepository.findById(id);
        if (nhaTroEntity.isPresent()) {
            nhaTroRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public ChiTietNhaTroResponse chiTietNhaTro_Id(Long id) {
        Optional<NhaTroEntity> nhaTroEntity = nhaTroRepository.findById(id);
        if (nhaTroEntity.isPresent()) {
            ChiTietNhaTroResponse chiTietNhaTroResponse = new ChiTietNhaTroResponse();
            chiTietNhaTroResponse.setId(nhaTroEntity.get().getId());
            chiTietNhaTroResponse.setTieuDe(nhaTroEntity.get().getTieuDe());
            chiTietNhaTroResponse.setDienTich(nhaTroEntity.get().getDienTich());
            chiTietNhaTroResponse.setHang(nhaTroEntity.get().getHang());
            chiTietNhaTroResponse.setTrangThai(nhaTroEntity.get().getTrangThai());
            chiTietNhaTroResponse.setDiaChi(nhaTroEntity.get().getDiaChi());
            chiTietNhaTroResponse.setGiaDien(nhaTroEntity.get().getGiaDien());
            chiTietNhaTroResponse.setGiaNuoc(nhaTroEntity.get().getGiaNuoc());
            chiTietNhaTroResponse.setGiaThue(nhaTroEntity.get().getGiaThue());
            chiTietNhaTroResponse.setMoTa(nhaTroEntity.get().getMoTa());
            chiTietNhaTroResponse.setNoiThat(nhaTroEntity.get().getNoiThat());
            chiTietNhaTroResponse.setHuyen(nhaTroEntity.get().getHuyenEntity().getTenHuyen());
            Optional<HuyenEntity> huyenEntity = huyenRepository.findById(nhaTroEntity.get().getHuyenEntity().getId());
            Optional<TinhEntity> tinhEntity = tinhRepository.findById(huyenEntity.get().getTinhEntity().getId());
            chiTietNhaTroResponse.setTinh(tinhEntity.get().getTenTinh());
            chiTietNhaTroResponse.setHuyen(huyenEntity.get().getTenHuyen());
            chiTietNhaTroResponse.setHinhAnh(nhaTroEntity.get().getHinhAnh());
            return chiTietNhaTroResponse;
        }
        return null;
    }

    public boolean capNhatNhaTro(NhaTroCapNhatRequest request) {
        Optional<NhaTroEntity> nhaTroEntity = nhaTroRepository.findById(request.getId());
        if (nhaTroEntity.isPresent()) {
            int check = nhaTroRepository.capNhatNhaTro(request);
            return true;
        }
        return false;
    }

    public List<NhaTroHienThiResponse> timKiemNhaTro(NhaTroTimKiemRequest request) {
        List<NhaTroEntity> nhaTroEntityList = nhaTroRepository.timKiemNhaTro(request);
        List<NhaTroHienThiResponse> hienThiResponseList = new ArrayList<>();
        for (NhaTroEntity nhaTroEntity : nhaTroEntityList) {
            if (nhaTroEntity.getTrangThai() == 1) {
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
                hienThiResponseList.add(hienThiResponse);
                hienThiResponse.setId(nhaTroEntity.getId());
                hienThiResponse.setHinhAnh(nhaTroEntity.getHinhAnh());
            }

        }
        return hienThiResponseList;
    }

}
