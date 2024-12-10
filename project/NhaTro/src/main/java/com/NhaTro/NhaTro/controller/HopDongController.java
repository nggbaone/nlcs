package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.request.admin.HopDongThemRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietHopDongResponse;
import com.NhaTro.NhaTro.dto.response.admin.HopDongHienThiResponse;
import com.NhaTro.NhaTro.service.HopDongService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("HopDongController")
@RequestMapping("/hop-dong")
@Transactional
@CrossOrigin(origins = "*")
public class HopDongController {

    @Autowired
    private HopDongService hopDongService;

    @GetMapping("/admin/hien-thi-1")
    public List<HopDongHienThiResponse> hienThiHopDong1(){
        return hopDongService.hienThiHopDong1();
    }

    @GetMapping("/admin/hien-thi-0")
    public List<HopDongHienThiResponse> hienThiHopDong0(){
        return hopDongService.hienThiHopDong0();
    }

    @GetMapping("/admin/het-han")
    public List<HopDongHienThiResponse> hetHanHopDong(){
        return hopDongService.hetHanHopDong();
    }

    @GetMapping("/admin/con-han")
    public List<HopDongHienThiResponse> conHanHopDong(){
        return hopDongService.conHanHopDong();
    }

    @PostMapping("/admin/them")
    public boolean themHopDong(@RequestBody HopDongThemRequest request ) {
        return hopDongService.themHopDong(request);
    }

    @GetMapping("/admin/chi-tiet/{id}")
    public ChiTietHopDongResponse chiTietHopDong(@PathVariable("id") Long id) {
        return hopDongService.chiTietHopDong(id);
    }

    @DeleteMapping("/admin/xoa/{id}")
    public boolean xoaHopDong(@PathVariable("id") Long id) {
        return hopDongService.xoaHopDong(id);
    }

    @GetMapping("/khach/con-han/{id}")
    public List<HopDongHienThiResponse> dangThueHopDong(@PathVariable("id") Long id){
        return hopDongService.dangThueHopDong(id);
    }

    @GetMapping("/khach/het-han/{id}")
    public List<HopDongHienThiResponse> daThueHopDong(@PathVariable("id") Long id){
        return hopDongService.daThueHopDong(id);
    }

}
