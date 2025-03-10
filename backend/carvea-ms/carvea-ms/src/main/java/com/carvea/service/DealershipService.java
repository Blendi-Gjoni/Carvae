package com.carvea.service;

import com.carvea.dto.DealershipDto;

import java.util.List;

public interface DealershipService {
    public DealershipDto addDealership(DealershipDto dealershipDto);
    public DealershipDto getDealershipById(Long id);
    public List<DealershipDto> getAllDealerships();
    public DealershipDto updateDealership(Long id, DealershipDto dealershipDto);
    public void deleteDealership(Long id);
    public List<Object[]> getNumberOfDealershipsByState();
}
