package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "YeuCau")
@Getter
@Setter
public class YeuCauEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "trangThai")
    private long trangThai;

    @ManyToOne
    @JoinColumn(name = "id_TaiKhoan")
    private TaiKhoanEntity taiKhoanEntity;

    @ManyToOne
    @JoinColumn(name = "id_NhaTro")
    private NhaTroEntity nhaTroEntity;
}
