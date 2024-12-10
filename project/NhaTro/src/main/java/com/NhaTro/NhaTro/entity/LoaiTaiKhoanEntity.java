package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "LoaiTaiKhoan")
@Getter
@Setter
public class LoaiTaiKhoanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "maLoai")
    private String maLoai;

    @Column(name = "vaiTro")
    private String vaiTro;

    @OneToMany(mappedBy = "loaiTaiKhoanEntity", fetch = FetchType.LAZY)
    private List<TaiKhoanEntity> taiKhoanEntityList = new ArrayList<>();
}
