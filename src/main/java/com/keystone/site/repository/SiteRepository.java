package com.keystone.site.repository;

import com.keystone.site.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SiteRepository extends JpaRepository<Site, UUID> {

    Optional<Site> findBySiteCode(String siteCode);

    boolean existsBySiteCode(String siteCode);
}