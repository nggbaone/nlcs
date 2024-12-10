package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "SuCo")
@Getter
@Setter
public class SuCoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "noiDung")
    private String noiDung;

    @Column(name = "hinhAnh")
    private String hinhAnh;

    @Column(name = "trangThai")
    private long trangThai;

    @Column(name = "ngayGui")
    private Date ngayGui;

    @ManyToOne
    @JoinColumn(name = "id_TaiKhoan")
    private TaiKhoanEntity taiKhoanEntity;

    @ManyToOne
    @JoinColumn(name = "id_NhaTro")
    private NhaTroEntity nhaTroEntity;

}
