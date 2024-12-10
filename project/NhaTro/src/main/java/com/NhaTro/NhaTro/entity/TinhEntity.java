package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Tinh")
@Getter
@Setter
public class TinhEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "maTinh")
    private String maTinh;

    @Column(name = "tenTinh")
    private String tenTinh;

    @OneToMany(mappedBy = "tinhEntity", fetch = FetchType.LAZY)
    private List<HuyenEntity> huyenEntityList = new ArrayList<HuyenEntity>();
}
