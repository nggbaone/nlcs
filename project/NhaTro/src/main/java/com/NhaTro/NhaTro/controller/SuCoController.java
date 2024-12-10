package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.request.khach.ThemSuCoRequest;
import com.NhaTro.NhaTro.dto.response.khach.SuCoHienThiAllResponse;
import com.NhaTro.NhaTro.service.SuCoService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("SuCoController")
@RequestMapping("/su-co")
@Transactional
@CrossOrigin(origins = "*")
public class SuCoController {

    @Autowired
    private SuCoService suCoService;

    @PostMapping("/khach")
    public boolean themSuCo(@RequestBody ThemSuCoRequest request) {
        return suCoService.themSuCo(request);
    }

    @GetMapping("/khach/{id}")
    public List<SuCoHienThiAllResponse> hienThi_Khach(@PathVariable("id") Long id) {
        return suCoService.hienThi_Khach(id);
    }

    @GetMapping("/khach/idSuCo/{id}")
    public SuCoHienThiAllResponse hienThi_SuCo(@PathVariable("id") Long id) {
        return suCoService.hienThi_SuCo(id);
    }

    @GetMapping("/admin/1")
    public List<SuCoHienThiAllResponse> hienThi_Admin_1() {
        return suCoService.hienThi_Admin_1();
    }

    @GetMapping("/admin/0")
    public List<SuCoHienThiAllResponse> hienThi_Admin_0() {
        return suCoService.hienThi_Admin_0();
    }

    @PostMapping("/admin/{id}")
    public boolean daXuLy(@PathVariable("id") Long id) {
        return suCoService.daXuLy(id);
    }

}
