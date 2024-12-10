package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.response.khach.HuyenHienThiResponse;
import com.NhaTro.NhaTro.service.HuyenService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("HuyenController")
@RequestMapping("/huyen")
@Transactional
@CrossOrigin(origins = "*")
public class HuyenController {

    @Autowired
    private HuyenService huyenService;

    @GetMapping("/{id}")
    public List<HuyenHienThiResponse> hienThiHuyen(@PathVariable("id") Long id) {
        return huyenService.hienThiHuyen(id);
    }

}
