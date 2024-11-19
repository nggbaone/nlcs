package com.NhaTro.NhaTro.controller;

import com.NhaTro.NhaTro.dto.request.khach.YeuThichThemRequest;
import com.NhaTro.NhaTro.dto.request.khach.YeuThichXoaRequest;
import com.NhaTro.NhaTro.dto.response.khach.NhaTroHienThiResponse;
import com.NhaTro.NhaTro.service.YeuThichService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("YeuThichController")
@RequestMapping("/yeu-thich")
@Transactional
@CrossOrigin(origins = "*")
public class YeuThichController {

    @Autowired
    private YeuThichService yeuThichService;

    @PostMapping()
    public boolean themYeuThich(@RequestBody YeuThichThemRequest request){
        yeuThichService.themYeuThich(request);
        return true;
    }

    @GetMapping("/{idTaiKhoan}")
    public List<NhaTroHienThiResponse> hienThiYeuThich(@PathVariable("idTaiKhoan") Long idTaiKhoan) {
        return yeuThichService.hienThiYeuThich(idTaiKhoan);
    }

    @DeleteMapping()
    public boolean xoaYeuThich(@RequestBody YeuThichXoaRequest request) {
        yeuThichService.xoaYeuThich(request);
        return true;
    }

}
