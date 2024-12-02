package net.york.tsg.specialization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@Service
public class SpecializationService {
	
	private final SpecializationRepository specializationRepository;

	@Autowired
	public SpecializationService(SpecializationRepository specializationRepository) {
		this.specializationRepository = specializationRepository;
	}

	public boolean specializationExists(String name) {
		return !specializationRepository.findSpecializationByName(name).isEmpty();
	}

	public ResponseEntity<?> getAllSpecializations() {
		return new ResponseEntity<>(specializationRepository.findAll(), HttpStatus.OK);
	}
	
}