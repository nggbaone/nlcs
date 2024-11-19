package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "NhaTro")
@Getter
@Setter
public class NhaTroEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "tieuDe")
    private String tieuDe;

    @Column(name = "diaChi")
    private String diaChi;

    @Column(name = "dienTich")
    private long dienTich;

    @Column(name = "giaThue")
    private long giaThue;

    @Column(name = "giaDien")
    private long giaDien;

    @Column(name = "giaNuoc")
    private long giaNuoc;

    @Column(name = "noiThat")
    private String noiThat;

    @Column(name = "hang")
    private long hang;

    @Column(name = "moTa")
    private String moTa;

    @Column(name = "trangThai")
    private long trangThai;

    @Column(name = "hinhAnh")
    private String hinhAnh;

    @ManyToOne
    @JoinColumn(name = "id_Huyen")
    private HuyenEntity huyenEntity;

    @OneToMany(mappedBy = "nhaTroEntity")
    private List<YeuThichEntity> yeuThichEntityList = new ArrayList<>();

    @OneToMany(mappedBy = "nhaTroEntity")
    private List<YeuCauEntity> yeuCauEntityList = new ArrayList<>();

    @OneToMany(mappedBy = "nhaTroEntity")
    private List<HopDongEntity> hopDongEntityList = new ArrayList<>();
}
