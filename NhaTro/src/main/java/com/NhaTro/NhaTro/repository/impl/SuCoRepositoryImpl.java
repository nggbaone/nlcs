package com.NhaTro.NhaTro.repository.impl;

import com.NhaTro.NhaTro.repository.custom.SuCoRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class SuCoRepositoryImpl implements SuCoRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

}
