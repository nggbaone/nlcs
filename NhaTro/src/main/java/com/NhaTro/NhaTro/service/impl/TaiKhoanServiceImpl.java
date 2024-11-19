package com.NhaTro.NhaTro.service.impl;

import com.NhaTro.NhaTro.customException.TaiKhoanDaTonTaiException;
import com.NhaTro.NhaTro.dto.request.TaiKhoanDangNhapRequest;
import com.NhaTro.NhaTro.dto.request.admin.CapNhatTaiKhoanRequest;
import com.NhaTro.NhaTro.dto.request.admin.TaiKhoanThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanDangKyRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanDoiMatKhauRequest;
import com.NhaTro.NhaTro.dto.response.TaiKhoanDangNhapResponse;
import com.NhaTro.NhaTro.dto.response.TokenResponse;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietTaiKhoanResponse;
import com.NhaTro.NhaTro.dto.response.admin.TaiKhoanHienThiResponse;
import com.NhaTro.NhaTro.dto.response.khach.TaiKhoanHoatDongResponse;
import com.NhaTro.NhaTro.entity.LoaiTaiKhoanEntity;
import com.NhaTro.NhaTro.entity.TaiKhoanEntity;
import com.NhaTro.NhaTro.repository.LoaiTaiKhoanRepository;
import com.NhaTro.NhaTro.repository.TaiKhoanRepository;
import com.NhaTro.NhaTro.service.AuthenticationService;
import com.NhaTro.NhaTro.service.TaiKhoanService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class TaiKhoanServiceImpl implements TaiKhoanService {

    private final TaiKhoanRepository getTaiKhoanRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private LoaiTaiKhoanRepository loaiTaiKhoanRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    @Lazy
    private AuthenticationService authenticationService;

    //khach
    public void dangKyTaiKhoan(TaiKhoanDangKyRequest request){
        TaiKhoanEntity response = new TaiKhoanEntity();
        response.setTaiKhoan(request.getTaiKhoan());

        String encodedPassword = passwordEncoder().encode(request.getMatKhau());

        response.setMatKhau(encodedPassword);
        response.setHoTen(request.getHoTen());
        List<LoaiTaiKhoanEntity> loaiTaiKhoanEntityList = loaiTaiKhoanRepository.findAll();
        for (LoaiTaiKhoanEntity i : loaiTaiKhoanEntityList) {
            if (i.getMaLoai().equals("KH")) {
                response.setLoaiTaiKhoanEntity(i);
                break;
            }
        }
        response.setTrangThai(1);
        List<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.hienThi_TaiKhoan_taiKhoan(response.getTaiKhoan());
        if (!taiKhoanEntity.isEmpty()) {
            throw new TaiKhoanDaTonTaiException("Tài khoản đã tồn tại.");
        }
        entityManager.persist(response);
    }

    //khach
    public TaiKhoanDangNhapResponse dangNhapTaiKhoan(TaiKhoanDangNhapRequest request){
        List<TaiKhoanEntity> taiKhoanEntityList = taiKhoanRepository.findAll();
        TaiKhoanDangNhapResponse taiKhoanDangNhapResponse = new TaiKhoanDangNhapResponse();
        for (TaiKhoanEntity i : taiKhoanEntityList) {
            if (i.getTaiKhoan().equals(request.getTaiKhoan()) && passwordEncoder().matches(request.getMatKhau(), i.getMatKhau())) {
                taiKhoanDangNhapResponse.setTaiKhoan(i.getTaiKhoan());
                taiKhoanDangNhapResponse.setMatKhau(i.getMatKhau());
                TokenResponse tokenResponse = authenticationService.authenticate(request);
                taiKhoanDangNhapResponse.setTokenResponse(tokenResponse);
                taiKhoanDangNhapResponse.setRole(i.getLoaiTaiKhoanEntity().getId());
                return taiKhoanDangNhapResponse;
            }
        }
        return taiKhoanDangNhapResponse;
    }

    //admin
    public List<TaiKhoanHienThiResponse> hienThiTaiKhoan(){
        List<TaiKhoanEntity> taiKhoanEntityList = taiKhoanRepository.findAll();
        List<TaiKhoanHienThiResponse> taiKhoanHienThiResponseList = new ArrayList<>();
        for (TaiKhoanEntity i : taiKhoanEntityList) {
            TaiKhoanHienThiResponse response = new TaiKhoanHienThiResponse();
            response.setId(i.getId());
            response.setHoTen(i.getHoTen());
            response.setTaiKhoan(i.getTaiKhoan());
            response.setMatKhau(i.getMatKhau());
            response.setSoDienThoai(i.getSoDienThoai());
            response.setEmail(i.getEmail());
            response.setDiaChi(i.getDiaChi());
            response.setTrangThai(i.getTrangThai());
            response.setChucVu(i.getLoaiTaiKhoanEntity().getId());
            taiKhoanHienThiResponseList.add(response);
        }
        return taiKhoanHienThiResponseList;
    }

    //admin
    public List<TaiKhoanHienThiResponse> hienThiTaiKhoan_hoTen(String hoTen){
        List<TaiKhoanEntity> taiKhoanEntityList = taiKhoanRepository.hienThi_TaiKhoan_hoTen(hoTen);
        List<TaiKhoanHienThiResponse> taiKhoanHienThiResponseList = new ArrayList<>();
        for (TaiKhoanEntity i : taiKhoanEntityList) {
            TaiKhoanHienThiResponse response = new TaiKhoanHienThiResponse();
            response.setTaiKhoan(i.getTaiKhoan());
            response.setMatKhau(i.getMatKhau());
            response.setHoTen(i.getHoTen());
            response.setSoDienThoai(i.getSoDienThoai());
            response.setEmail(i.getEmail());
            response.setDiaChi(i.getDiaChi());
            response.setTrangThai(i.getTrangThai());
            taiKhoanHienThiResponseList.add(response);
        }
        return taiKhoanHienThiResponseList;
    }

    //admin
    public List<TaiKhoanHienThiResponse> hienThiTaiKhoan_taiKhoan(String taiKhoan){
        List<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.hienThi_TaiKhoan_taiKhoan(taiKhoan);
        List<TaiKhoanHienThiResponse> taiKhoanHienThiResponse = new ArrayList<>();
        if (taiKhoanEntity != null) {
            for (TaiKhoanEntity i : taiKhoanEntity) {
                TaiKhoanHienThiResponse response = new TaiKhoanHienThiResponse();
                response.setTaiKhoan(i.getTaiKhoan());
                response.setMatKhau(i.getMatKhau());
                response.setHoTen(i.getHoTen());
                response.setSoDienThoai(i.getSoDienThoai());
                response.setEmail(i.getEmail());
                response.setDiaChi(i.getDiaChi());
                response.setTrangThai(i.getTrangThai());
                taiKhoanHienThiResponse.add(response);
            }
        }
        return taiKhoanHienThiResponse;
    }

    //admin
    public void xoaTaiKhoan(Long id){
        taiKhoanRepository.deleteById(id);
    }

    //khach
    public TaiKhoanHoatDongResponse hienThiTaiKhoan_id(Long id) {
        TaiKhoanHoatDongResponse taiKhoanHoatDongResponse = new TaiKhoanHoatDongResponse();
        TaiKhoanEntity taiKhoanEntity = taiKhoanRepository.findById(id).get();
        taiKhoanHoatDongResponse.setHoTen(taiKhoanEntity.getHoTen());
        taiKhoanHoatDongResponse.setTaiKhoan(taiKhoanEntity.getTaiKhoan());
        taiKhoanHoatDongResponse.setMatKhau(taiKhoanEntity.getMatKhau());
        taiKhoanHoatDongResponse.setEmail(taiKhoanEntity.getEmail());
        taiKhoanHoatDongResponse.setSoDienThoai(taiKhoanEntity.getSoDienThoai());
        taiKhoanHoatDongResponse.setDiaChi(taiKhoanEntity.getDiaChi());
        return taiKhoanHoatDongResponse;
    }

    //khach
    public boolean capNhatTaiKhoan(TaiKhoanCapNhatRequest request) {
        TaiKhoanEntity taiKhoanEntity = taiKhoanRepository.findById(request.getId()).get();
        if (taiKhoanEntity == null) {
            return false;
        }
        int check = taiKhoanRepository.capNhatTaiKhoan(request);
        return true;
    }

    //khach
    public boolean doiMatKhauTaiKhoan(TaiKhoanDoiMatKhauRequest request) {
        TaiKhoanEntity taiKhoanEntity = taiKhoanRepository.findById(request.getId()).get();
        if (taiKhoanEntity == null) {
            return false;
        }
        if (!passwordEncoder().matches(request.getMatKhauHienTai(), taiKhoanEntity.getMatKhau())) {
            return false;
        }
        if (!request.getMatKhauMoi1().equals(request.getMatKhauMoi2())) {
            return false;
        }
        String encodedPassword = passwordEncoder().encode(request.getMatKhauMoi1());

        request.setMatKhauMoi1(encodedPassword);

        int check = taiKhoanRepository.doiMatKhauTaiKhoan(request);
        return true;
    }

    // admin
    public boolean themTaiKhoan(TaiKhoanThemRequest request) {
        TaiKhoanEntity taiKhoanEntity = new TaiKhoanEntity();
        taiKhoanEntity.setHoTen(request.getHoTen());
        taiKhoanEntity.setTaiKhoan(request.getTaiKhoan());
        String encodedPassword = passwordEncoder().encode(request.getMatKhau());
        taiKhoanEntity.setMatKhau(encodedPassword);
        taiKhoanEntity.setEmail(request.getEmail());
        taiKhoanEntity.setSoDienThoai(request.getSoDienThoai());
        taiKhoanEntity.setDiaChi(request.getDiaChi());
        taiKhoanEntity.setTrangThai(1);
        Optional<LoaiTaiKhoanEntity> loaiTaiKhoanEntity = loaiTaiKhoanRepository.findById(request.getChucVu());
        taiKhoanEntity.setLoaiTaiKhoanEntity(loaiTaiKhoanEntity.get());
        entityManager.persist(taiKhoanEntity);
        return true;
    }

    public ChiTietTaiKhoanResponse xemTaiKhoan(Long id){
        Optional<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.findById(id);
        if (taiKhoanEntity.isPresent()) {
            ChiTietTaiKhoanResponse response = new ChiTietTaiKhoanResponse();
            response.setId(taiKhoanEntity.get().getId());
            response.setHoTen(taiKhoanEntity.get().getHoTen());
            response.setTaiKhoan(taiKhoanEntity.get().getTaiKhoan());
            response.setEmail(taiKhoanEntity.get().getEmail());
            response.setSoDienThoai(taiKhoanEntity.get().getSoDienThoai());
            response.setDiaChi(taiKhoanEntity.get().getDiaChi());
            response.setTrangThai(taiKhoanEntity.get().getTrangThai());
            response.setMatKhau(taiKhoanEntity.get().getMatKhau());
            response.setChucVu(taiKhoanEntity.get().getLoaiTaiKhoanEntity().getId());
            return response;
        }
        return null;
    }

    public boolean ad_CapNhatTaiKhoan(CapNhatTaiKhoanRequest request) {
        Optional<TaiKhoanEntity> taiKhoanEntity = taiKhoanRepository.findById(request.getId());
        if (taiKhoanEntity.isPresent()) {
            String encodedPassword = passwordEncoder().encode(request.getMatKhau());
            request.setMatKhau(encodedPassword);
            int check = taiKhoanRepository.ad_CapNhatTaiKhoan(request);
            return true;
        }
        return false;
    }

    @Override
    public UserDetailsService userDetailsService() {
        return username -> getTaiKhoanRepository.findByTaiKhoan(username).orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }
}
