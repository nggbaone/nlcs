package com.NhaTro.NhaTro.service.impl;

import com.NhaTro.NhaTro.dto.response.khach.HuyenHienThiResponse;
import com.NhaTro.NhaTro.entity.HuyenEntity;
import com.NhaTro.NhaTro.repository.HuyenRepository;
import com.NhaTro.NhaTro.service.HuyenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class HuyenServiceImpl implements HuyenService {

    @Autowired
    private HuyenRepository huyenRepository;

    public List<HuyenHienThiResponse> hienThiHuyen(Long id) {
        List<HuyenEntity> huyenEntityList = huyenRepository.hienThi_Huyen_IdTinh(id);
        List<HuyenHienThiResponse> huyenHienThiResponseList = new ArrayList<>();
        for (HuyenEntity i : huyenEntityList) {
            HuyenHienThiResponse huyenHienThiResponse = new HuyenHienThiResponse();
            huyenHienThiResponse.setId(i.getId());
            huyenHienThiResponse.setMaHuyen(i.getMaHuyen());
            huyenHienThiResponse.setTenHuyen(i.getTenHuyen());
            huyenHienThiResponseList.add(huyenHienThiResponse);
        }
        return huyenHienThiResponseList;
    }

}
