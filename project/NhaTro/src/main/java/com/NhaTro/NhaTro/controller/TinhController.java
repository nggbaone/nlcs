package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.response.khach.TinhHienThiResponse;
import com.NhaTro.NhaTro.service.TinhService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("TinhController")
@RequestMapping("/tinh")
@Transactional
@CrossOrigin(origins = "*")
public class TinhController {

    @Autowired
    private TinhService tinhService;

    @GetMapping()
    public List<TinhHienThiResponse> hienThiTinh(){
        return tinhService.hienThiTinh();
    }

}
