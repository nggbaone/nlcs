package com.NhaTro.NhaTro.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "TaiKhoan")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaiKhoanEntity implements UserDetails , Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "taiKhoan")
    private String taiKhoan;

    @Column(name = "matKhau")
    private String matKhau;

    @Column(name = "hoTen")
    private String hoTen;

    @Column(name = "soDienThoai")
    private String soDienThoai;

    @Column(name = "email")
    private String email;

    @Column(name = "diaChi")
    private String diaChi;

    @Column(name = "giayTo")
    private String giayTo;

    @Column(name = "trangThai")
    private long trangThai;

    @ManyToOne
    @JoinColumn(name = "id_LoaiTaiKhoan")
    private LoaiTaiKhoanEntity loaiTaiKhoanEntity;

    @OneToMany(mappedBy = "taiKhoanEntity", fetch = FetchType.LAZY)
    private List<YeuThichEntity> yeuThichEntityList = new ArrayList<>();

    @OneToMany(mappedBy = "taiKhoanEntity", fetch = FetchType.LAZY)
    private List<YeuCauEntity> yeuCauEntityList = new ArrayList<>();

    @OneToMany(mappedBy = "taiKhoanEntity", fetch = FetchType.LAZY)
    private List<HopDongEntity> hopDongEntityList = new ArrayList<>();

    @OneToMany(mappedBy = "taiKhoanEntity", fetch = FetchType.LAZY)
    private List<SuCoEntity> suCoEntityList = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return matKhau;
    }

    @Override
    public String getUsername() {
        return taiKhoan;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
