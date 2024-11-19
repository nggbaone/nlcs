package com.NhaTro.NhaTro.dto.request;

import com.NhaTro.NhaTro.ultils.Platform;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaiKhoanDangNhapRequest {

    @NotBlank(message = "taikhoan must be not blank")
    private String taiKhoan;

    @NotBlank(message = "matkhau must be not blank")
    private String matKhau;

    @NotNull(message = "platform must be not null")
    private Platform platform;

    private String deviceToken;

}
