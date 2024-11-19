package com.NhaTro.NhaTro.service.impl;

import com.NhaTro.NhaTro.dto.response.khach.TinhHienThiResponse;
import com.NhaTro.NhaTro.entity.TinhEntity;
import com.NhaTro.NhaTro.repository.TinhRepository;
import com.NhaTro.NhaTro.service.TinhService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TinhServiceImpl implements TinhService {

    @Autowired
    private TinhRepository tinhRepository;

    public List<TinhHienThiResponse> hienThiTinh() {
        List<TinhEntity> tinhEntityList = tinhRepository.findAll();
        List<TinhHienThiResponse> tinhHienThiResponseList = new ArrayList<>();
        for (TinhEntity i : tinhEntityList) {
            TinhHienThiResponse tinhHienThiResponse = new TinhHienThiResponse();
            tinhHienThiResponse.setId(i.getId());
            tinhHienThiResponse.setMaTinh(i.getMaTinh());
            tinhHienThiResponse.setTenTinh(i.getTenTinh());
            tinhHienThiResponseList.add(tinhHienThiResponse);
        }
        return tinhHienThiResponseList;
    }

}
