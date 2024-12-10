package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "YeuThich")
@Getter
@Setter
public class YeuThichEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_TaiKhoan")
    private TaiKhoanEntity taiKhoanEntity;

    @ManyToOne
    @JoinColumn(name = "id_NhaTro")
    private NhaTroEntity nhaTroEntity;
}
