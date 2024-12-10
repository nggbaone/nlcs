package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "HopDong")
@Getter
@Setter
public class HopDongEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ngayBatDau")
    private Date ngayBatDau;

    @Column(name = "ngayKetThuc")
    private Date ngayKetThuc;

    @Column(name = "trangThai")
    private Long trangThai;

    @ManyToOne
    @JoinColumn(name = "id_TaiKhoan")
    private TaiKhoanEntity taiKhoanEntity;

    @ManyToOne
    @JoinColumn(name = "id_NhaTro")
    private NhaTroEntity nhaTroEntity;
}
