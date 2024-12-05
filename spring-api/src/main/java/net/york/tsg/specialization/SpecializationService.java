package net.york.tsg.specialization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

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
		List<Specialization> specializations = specializationRepository.findAll();
		if (specializations.size() <= 0)
			return new ResponseEntity<>(
				"There are no specializations saved",
				HttpStatus.NOT_FOUND);
		System.out.println(specializations);
		return new ResponseEntity<>(specializations, HttpStatus.OK);
	}
	
}