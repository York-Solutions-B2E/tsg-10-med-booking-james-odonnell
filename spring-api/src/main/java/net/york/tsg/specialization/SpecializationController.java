package net.york.tsg.specialization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping(path = "specializations")
public class SpecializationController {

	private final SpecializationService specializationService;

	@Autowired
	public SpecializationController(SpecializationService specializationService) {
		this.specializationService = specializationService;
	}

	@GetMapping
	public ResponseEntity<?> getAllSpecializations() {
		return specializationService.getAllSpecializations();
	}
	
}