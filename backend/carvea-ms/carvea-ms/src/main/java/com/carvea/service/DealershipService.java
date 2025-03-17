package com.carvea.service;

import com.carvea.dto.DealershipDto;
import com.carvea.dto.DealershipRequestDto;

import java.io.IOException;
import java.util.List;

public interface DealershipService {
    public DealershipDto addDealership(DealershipRequestDto dealershipRequestDto) throws IOException;
    public DealershipDto getDealershipById(Long id);
    public List<DealershipDto> getAllDealerships();
    public DealershipDto updateDealership(Long id, DealershipDto dealershipDto);
    public void deleteDealership(Long id);
    public List<Object[]> getNumberOfDealershipsByState();
}
