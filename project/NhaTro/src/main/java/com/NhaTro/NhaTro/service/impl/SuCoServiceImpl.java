package com.NhaTro.NhaTro.service.impl;

import com.NhaTro.NhaTro.dto.request.khach.ThemSuCoRequest;
import com.NhaTro.NhaTro.dto.response.khach.SuCoHienThiAllResponse;
import com.NhaTro.NhaTro.entity.HopDongEntity;
import com.NhaTro.NhaTro.entity.NhaTroEntity;
import com.NhaTro.NhaTro.entity.SuCoEntity;
import com.NhaTro.NhaTro.entity.TaiKhoanEntity;
import com.NhaTro.NhaTro.repository.HopDongRepository;
import com.NhaTro.NhaTro.repository.NhaTroRepository;
import com.NhaTro.NhaTro.repository.SuCoRepository;
import com.NhaTro.NhaTro.repository.TaiKhoanRepository;
import com.NhaTro.NhaTro.service.SuCoService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SuCoServiceImpl implements SuCoService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private NhaTroRepository nhaTroRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private HopDongRepository hopDongRepository;

    @Autowired
    private SuCoRepository suCoRepository;

    public boolean themSuCo(ThemSuCoRequest request) {
        Optional<HopDongEntity> hopDongEntity = hopDongRepository.findById(request.getId_HopDong());
        if (hopDongEntity.isPresent()) {
            Optional<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.findById(hopDongEntity.get().getTaiKhoanEntity().getId());
            Optional<NhaTroEntity> nhaTroEntity = nhaTroRepository.findById(hopDongEntity.get().getNhaTroEntity().getId());
            SuCoEntity suCoEntity = new SuCoEntity();
            suCoEntity.setNoiDung(request.getNoiDung());
            suCoEntity.setHinhAnh(request.getHinhAnh());
            suCoEntity.setTrangThai(1L); // 1 chua xu ly
            suCoEntity.setTaiKhoanEntity(taiKhoanEntity.get());
            suCoEntity.setNhaTroEntity(nhaTroEntity.get());
            LocalDate today = LocalDate.now();
            suCoEntity.setNgayGui(Date.valueOf(today));
            entityManager.persist(suCoEntity);
            return true;
        }
        return false;
    }

    public List<SuCoHienThiAllResponse> hienThi_Khach(Long id) {
        List<SuCoEntity> suCoEntityList = suCoRepository.findAll();
        List<SuCoHienThiAllResponse> suCoHienThiAllResponseList = new ArrayList<>();
        for (SuCoEntity i : suCoEntityList) {
            if (i.getTaiKhoanEntity().getId() == id) {
                SuCoHienThiAllResponse response = new SuCoHienThiAllResponse();
                response.setNoiDung(i.getNoiDung());
                response.setNgayGui(i.getNgayGui());
                response.setHinhAnh(i.getHinhAnh());
                response.setTen_Khach(i.getTaiKhoanEntity().getHoTen());
                response.setTen_Tro(i.getNhaTroEntity().getTieuDe());
                response.setTrangThai(i.getTrangThai());
                response.setId(i.getId());
                suCoHienThiAllResponseList.add(response);
            }
        }
        return suCoHienThiAllResponseList;
    }

    public SuCoHienThiAllResponse hienThi_SuCo(Long id) {
        Optional<SuCoEntity> suCoEntity = suCoRepository.findById(id);
        SuCoHienThiAllResponse response = new SuCoHienThiAllResponse();
        response.setNoiDung(suCoEntity.get().getNoiDung());
        response.setNgayGui(suCoEntity.get().getNgayGui());
        response.setHinhAnh(suCoEntity.get().getHinhAnh());
        response.setTen_Khach(suCoEntity.get().getTaiKhoanEntity().getHoTen());
        response.setTen_Tro(suCoEntity.get().getNhaTroEntity().getTieuDe());
        response.setTrangThai(suCoEntity.get().getTrangThai());
        response.setId(suCoEntity.get().getId());
        return response;
    }

    public List<SuCoHienThiAllResponse> hienThi_Admin_1() {
        List<SuCoEntity> suCoEntity = suCoRepository.findAll();
        List<SuCoHienThiAllResponse> suCoHienThiAllResponseList = new ArrayList<>();
        for (SuCoEntity i : suCoEntity) {
            if (i.getTrangThai() == 1) {
                SuCoHienThiAllResponse response = new SuCoHienThiAllResponse();
                response.setNoiDung(i.getNoiDung());
                response.setNgayGui(i.getNgayGui());
                response.setHinhAnh(i.getHinhAnh());
                response.setTen_Khach(i.getTaiKhoanEntity().getHoTen());
                response.setTen_Tro(i.getNhaTroEntity().getTieuDe());
                response.setTrangThai(i.getTrangThai());
                response.setId(i.getId());
                suCoHienThiAllResponseList.add(response);
            }
        }
        return suCoHienThiAllResponseList;
    }

    public List<SuCoHienThiAllResponse> hienThi_Admin_0() {
        List<SuCoEntity> suCoEntity = suCoRepository.findAll();
        List<SuCoHienThiAllResponse> suCoHienThiAllResponseList = new ArrayList<>();
        for (SuCoEntity i : suCoEntity) {
            if (i.getTrangThai() == 0) {
                SuCoHienThiAllResponse response = new SuCoHienThiAllResponse();
                response.setNoiDung(i.getNoiDung());
                response.setNgayGui(i.getNgayGui());
                response.setHinhAnh(i.getHinhAnh());
                response.setTen_Khach(i.getTaiKhoanEntity().getHoTen());
                response.setTen_Tro(i.getNhaTroEntity().getTieuDe());
                response.setTrangThai(i.getTrangThai());
                response.setId(i.getId());
                suCoHienThiAllResponseList.add(response);
            }
        }
        return suCoHienThiAllResponseList;
    }

    public boolean daXuLy(Long id) {
        SuCoEntity suCoEntity = suCoRepository.findById(id).get();
        if (suCoEntity != null) {
            suCoEntity.setTrangThai(0L);
            entityManager.merge(suCoEntity);
            return true;
        }
        return false;
    }

}
