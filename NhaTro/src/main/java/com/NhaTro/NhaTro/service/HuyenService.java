package com.NhaTro.NhaTro.service;

import com.NhaTro.NhaTro.dto.response.khach.HuyenHienThiResponse;

import java.util.List;

public interface HuyenService {

    List<HuyenHienThiResponse> hienThiHuyen(Long id);

}
