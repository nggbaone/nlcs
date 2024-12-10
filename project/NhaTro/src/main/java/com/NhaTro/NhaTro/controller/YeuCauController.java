package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.request.khach.YeuCauThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.YeuCauXoaRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietYeuCauResponse;
import com.NhaTro.NhaTro.dto.response.admin.YeuCauHienThiResponse;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;
import com.NhaTro.NhaTro.service.YeuCauService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("YeuCauController")
@RequestMapping("/yeu-cau")
@Transactional
@CrossOrigin(origins = "*")
public class YeuCauController {

    @Autowired
    private YeuCauService yeuCauService;

    @GetMapping("/admin/hien-thi")
    public List<YeuCauHienThiResponse> hienThiYeuCau_Admin() {
        return yeuCauService.hienThiYeuCau_Admin();
    }

    @PostMapping
    public boolean themYeuCau(@RequestBody YeuCauThemRequest request) {
        return yeuCauService.themYeuCau(request);
    }

    @GetMapping("/{idTaiKhoan}")
    public List<NhaTroHienThiResponse> hienThiYeuCau(@PathVariable("idTaiKhoan") Long idTaiKhoan) {
        return yeuCauService.hienThiYeuCau(idTaiKhoan);
    }

    @GetMapping("/hien-thi-1/{idTaiKhoan}")
    public List<NhaTroHienThiResponse> hienThiYeuCau1(@PathVariable("idTaiKhoan") Long idTaiKhoan) {
        return yeuCauService.hienThiYeuCau1(idTaiKhoan);
    }

    @DeleteMapping()
    public boolean xoaYeuCau(@RequestBody YeuCauXoaRequest request) {
        yeuCauService.xoaYeuCau(request);
        return true;
    }

    @GetMapping("/admin/chi-tiet/{id}")
    public ChiTietYeuCauResponse chiTietYeuCau(@PathVariable("id") Long id) {
        return yeuCauService.chiTietYeuCau(id);
    }

    @DeleteMapping("/admin/xoa/{id}")
    public boolean ad_XoaYeuCau(@PathVariable("id") Long id) {
        return yeuCauService.ad_XoaYeuCau(id);
    }

}
