package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.request.TaiKhoanDangNhapRequest;
import com.NhaTro.NhaTro.dto.request.admin.CapNhatTaiKhoanRequest;
import com.NhaTro.NhaTro.dto.request.admin.TaiKhoanThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanDangKyRequest;
import com.NhaTro.NhaTro.dto.request.khach.TaiKhoanDoiMatKhauRequest;
import com.NhaTro.NhaTro.dto.response.TaiKhoanDangNhapResponse;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietTaiKhoanResponse;
import com.NhaTro.NhaTro.dto.response.admin.TaiKhoanHienThiResponse;
import com.NhaTro.NhaTro.dto.response.khach.TaiKhoanHoatDongResponse;
import com.NhaTro.NhaTro.service.TaiKhoanService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("TaiKhoanController")
@RequestMapping("/tai-khoan")
@Transactional
@CrossOrigin(origins = "*")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping("/admin/hien-thi")
    public List<TaiKhoanHienThiResponse> hienThiTaiKhoan(){
        return taiKhoanService.hienThiTaiKhoan();
    }

    @GetMapping("/admin/hien-thi/hoTen")
    public List<TaiKhoanHienThiResponse> hienThiTaiKhoan_hoTen(@RequestParam("hoTen") String hoTen){
        return taiKhoanService.hienThiTaiKhoan_hoTen(hoTen);
    }

    @GetMapping("/admin/hien-thi/taiKhoan")
    public List<TaiKhoanHienThiResponse> hienThiTaiKhoan_taiKhoan(@RequestParam("taiKhoan") String taiKhoan){
        return taiKhoanService.hienThiTaiKhoan_taiKhoan(taiKhoan);
    }

    @DeleteMapping("/admin/xoa/{id}")
    public void xoaTaiKhoan(@PathVariable("id") Long id){
        taiKhoanService.xoaTaiKhoan(id);
    }

    @PostMapping("/dang-ky")
    public ResponseEntity<String> dangKyTaiKhoan(@RequestBody TaiKhoanDangKyRequest request){
        taiKhoanService.dangKyTaiKhoan(request);
        return ResponseEntity.ok("Đăng ký tài khoản thành công!");
    }

    @PostMapping("/admin/them")
    public ResponseEntity<String> themTaiKhoan(@RequestBody TaiKhoanThemRequest request) {
        boolean check = taiKhoanService.themTaiKhoan(request);
        if (check) {
            return ResponseEntity.ok("Thêm tài khoản thành công!");
        } else {
            return ResponseEntity.badRequest().body("Thêm tài khoản thất bại");
        }
    }

    @PostMapping("/dang-nhap")
    public TaiKhoanDangNhapResponse dangNhapTaiKhoan(@RequestBody TaiKhoanDangNhapRequest request){
        return taiKhoanService.dangNhapTaiKhoan(request);
    }

    @GetMapping("/{id}")
    public TaiKhoanHoatDongResponse hienThiTaiKhoan_id(@PathVariable("id") Long id) {
        return taiKhoanService.hienThiTaiKhoan_id(id);
    }

    @PutMapping("/khach/cap-nhat")
    public boolean capNhatTaiKhoan(@RequestBody TaiKhoanCapNhatRequest request) {
        return taiKhoanService.capNhatTaiKhoan(request);
    }

    @PutMapping("/khach/mat-khau")
    public boolean doiMatKhauTaiKhoan(@RequestBody TaiKhoanDoiMatKhauRequest request) {
        return taiKhoanService.doiMatKhauTaiKhoan(request);
    }

    @GetMapping("/admin/chi-tiet/{id}")
    public ChiTietTaiKhoanResponse chiTietTaiKhoan(@PathVariable("id") Long id) {
        return taiKhoanService.xemTaiKhoan(id);
    }

    @PutMapping("/admin/cap-nhat")
    public boolean ad_CapNhatTaiKhoan(@RequestBody CapNhatTaiKhoanRequest request) {
        return taiKhoanService.ad_CapNhatTaiKhoan(request);
    }

}
