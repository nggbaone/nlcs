package com.NhaTro.NhaTro.controllerAdvice;

import com.NhaTro.NhaTro.customException.TaiKhoanDaTonTaiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class TaiKhoanDaTonTaiControllerAdvice {
    @ExceptionHandler(TaiKhoanDaTonTaiException.class)
    public ResponseEntity<String> handleTaiKhoanDaTonTai(TaiKhoanDaTonTaiException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
