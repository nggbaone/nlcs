package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Huyen")
@Getter
@Setter
public class HuyenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "maHuyen")
    private String maHuyen;

    @Column(name = "tenHuyen")
    private String tenHuyen;

    @ManyToOne
    @JoinColumn(name = "id_Tinh")
    private TinhEntity tinhEntity;

    @OneToMany(mappedBy = "huyenEntity")
    private List<NhaTroEntity> nhaTroEntityList = new ArrayList<>();
}
