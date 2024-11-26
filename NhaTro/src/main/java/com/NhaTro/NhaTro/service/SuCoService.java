package com.NhaTro.NhaTro.service;

import com.NhaTro.NhaTro.dto.request.khach.ThemSuCoRequest;
import com.NhaTro.NhaTro.dto.response.khach.SuCoHienThiAllResponse;

import java.util.List;

public interface SuCoService {

    boolean themSuCo(ThemSuCoRequest request);
    List<SuCoHienThiAllResponse> hienThi_Khach(Long id);
    SuCoHienThiAllResponse hienThi_SuCo(Long id);
    List<SuCoHienThiAllResponse> hienThi_Admin_1();
    List<SuCoHienThiAllResponse> hienThi_Admin_0();
    boolean daXuLy(Long id);

}
