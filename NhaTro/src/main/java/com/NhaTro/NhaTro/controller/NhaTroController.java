package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.request.admin.NhaTroCapNhatRequest;
import com.NhaTro.NhaTro.dto.request.admin.NhaTroThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.NhaTroTimKiemRequest;
import com.NhaTro.NhaTro.dto.response.admin.ChiTietNhaTroResponse;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;

import com.NhaTro.NhaTro.service.NhaTroService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("NhaTroController")
@RequestMapping("/nha-tro")
@Transactional
@CrossOrigin(origins = "*")
public class NhaTroController {

    @Autowired
    private NhaTroService nhaTroService;

    @GetMapping()
    public List<NhaTroHienThiResponse> hienThiNhaTro(){
        return nhaTroService.hienThiNhaTro();
    }

    @GetMapping("/{id_tro}")
    public NhaTroHienThiResponse hienThiNhaTro_Id(@PathVariable("id_tro") String id_tro){
        Long id = Long.parseLong(id_tro);
        return nhaTroService.hienThiNhaTro_Id_ChiTiet(id);
    }

    @GetMapping("/admin/chi-tiet/{id}")
    public ChiTietNhaTroResponse chiTietNhaTro_Id(@PathVariable("id") Long id_NhaTro){
        return nhaTroService.chiTietNhaTro_Id(id_NhaTro);
    }

    @PostMapping("/them")
    public ResponseEntity<String> themNhaTro(@RequestBody NhaTroThemRequest request){
        nhaTroService.themNhaTro(request);
        return ResponseEntity.ok("Thêm nhà trọ thành công!");
    }

    @DeleteMapping("/admin/xoa/{id}")
    public boolean xoaNhaTro(@PathVariable("id") Long id) {
        return nhaTroService.xoaNhaTro(id);
    }

    @PutMapping("/admin/cap-nhat")
    public boolean capNhatNhaTro(@RequestBody NhaTroCapNhatRequest request) {
        return nhaTroService.capNhatNhaTro(request);
    }

    @PostMapping("/tim-kiem")
    public List<NhaTroHienThiResponse> timKiemNhaTro(@RequestBody NhaTroTimKiemRequest request) {
        return nhaTroService.timKiemNhaTro(request);
    }

}