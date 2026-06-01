package com.aelb.service;

import com.aelb.model.Evenement;
import com.aelb.repository.EvenementRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class EvenementService {

    private final EvenementRepository evenementRepository;

    public EvenementService(EvenementRepository evenementRepository) {
        this.evenementRepository = evenementRepository;
    }

    public Page<Evenement> getEvents(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        return evenementRepository.findByDateDebutBetweenAndPublieTrue(start, end, pageable);
    }

    public List<Evenement> getUpcomingEvents(Pageable pageable) {
        return evenementRepository.findUpcomingEvents(pageable);
    }

    public Evenement save(Evenement evenement) {
        return evenementRepository.save(evenement);
    }

    public void delete(Long id) {
        evenementRepository.deleteById(id);
    }

    public Evenement findById(Long id) {
        return evenementRepository.findById(id).orElseThrow(() -> new RuntimeException("Événement non trouvé"));
    }
}
