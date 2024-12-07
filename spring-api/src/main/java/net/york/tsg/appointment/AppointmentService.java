package net.york.tsg.appointment;

import net.york.tsg.doctor.Doctor;
import net.york.tsg.doctor.DoctorRepository;

import net.york.tsg.patient.Patient;
import net.york.tsg.patient.PatientRepository;

import net.york.tsg.dto.AppointmentDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;


@Service
public class AppointmentService {
	
	private final AppointmentRepository appointmentRepository;
	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;

	@Autowired
	public AppointmentService(
		AppointmentRepository appointmentRepository,
		DoctorRepository doctorRepository,
		PatientRepository patientRepository) {
		this.appointmentRepository = appointmentRepository;
		this.doctorRepository = doctorRepository;
		this.patientRepository = patientRepository;
	}

	private ArrayList<AppointmentDTO> asDTOs(List<Appointment> appointments) {
		ArrayList<AppointmentDTO> dtos = new ArrayList<AppointmentDTO>();
		for (Appointment appt : appointments)
			if (appt.getStatus() != AppointmentStatus.CANCELLED)
				dtos.add(appt.toDTO());
		return dtos;
	}

	public ResponseEntity<?> getAllAppointments() {
		return new ResponseEntity<>(
			asDTOs(appointmentRepository.findAll()),
			HttpStatus.OK);
	}

	public ResponseEntity<?> getAppointmentById(Appointment appointment) {
		if (appointment.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointment.getId());
		if (optionalAppointment.isEmpty())
			return new ResponseEntity<>(
				"Error: appointment_id: " + appointment.getId() + " not found.",
				HttpStatus.NOT_FOUND
			);
		return ResponseEntity.ok().body(optionalAppointment.get().toDTO());
	}

	
	public ResponseEntity<?> getAllAppointmentsByDoctor(Long doctorId) {
		if (doctorRepository.findById(doctorId).isEmpty())
			return new ResponseEntity<>(
				"Error: no appointments found; doctor_id: " + doctorId + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		return new ResponseEntity<>(
			asDTOs(appointmentRepository.findAllByDoctorId(doctorId)),
			HttpStatus.OK);
	}

	public ResponseEntity<?> getAllAppointmentsByPatient(Long patientId) {
		if (patientRepository.findById(patientId).isEmpty())
			return new ResponseEntity<>(
				"Error: no appointments found; patient_id: " + patientId + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		return new ResponseEntity<>(
			asDTOs(appointmentRepository.findAllByPatientId(patientId)),
			HttpStatus.OK);
	}

	public ResponseEntity<?> getAllAppointmentsByPatientEmail(String email) {
		Optional<Patient> optionalPatient = patientRepository.findByEmail(email);
		if (optionalPatient.isEmpty())
			return new ResponseEntity<>(
				"Error: email: " + email + " is not tied to any patients.",
				HttpStatus.NOT_FOUND
			);

		return new ResponseEntity<>(
			asDTOs(appointmentRepository.findAllByPatientId(optionalPatient.get().getId())),
			HttpStatus.OK);
	}

	public ResponseEntity<?> scheduleNewAppointment(Appointment appointment) {
		Long doctor_id = appointment.getDoctor().getId();
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor_id);
		if (optionalDoctor.isEmpty())
			return new ResponseEntity<>(
				"Error: could not schedule appointment; doctor_id: " + doctor_id + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		Patient patient = appointment.getPatient();
		Optional<Patient> optionalPatient = patientRepository.findByEmail(patient.getEmail());
		if (optionalPatient.isEmpty()) {
			patientRepository.save(
				Patient.builder()
				.email(patient.getEmail())
				.firstName(patient.getFirstName())
				.lastName(patient.getLastName())
				.dob(patient.getDob())
				.build()
			);
			optionalPatient = patientRepository.findByEmail(patient.getEmail());
		}

		appointment.setDoctor(optionalDoctor.get());
		appointment.setPatient(optionalPatient.get());
		appointment.setStatus(AppointmentStatus.CONFIRMED);
		appointmentRepository.save(appointment);
		return new ResponseEntity<>(appointment.toDTO(), HttpStatus.OK);
	}

	public ResponseEntity<?> cancelAppointment(Appointment appointment) {
		if (appointment.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointment.getId());
		if (optionalAppointment.isEmpty())
			return new ResponseEntity<>(
				"Error: could not cancel appointment; appointment_id: " + appointment.getId() + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		optionalAppointment.get().setStatus(AppointmentStatus.CANCELLED);

		return new ResponseEntity<>(optionalAppointment.get().toDTO(), HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<?> updateAppointment(Appointment appointment) {
		if (appointment.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointment.getId());
		if (optionalAppointment.isEmpty())
			return new ResponseEntity<>(
				"Error: could not reschedule appointment; appointment_id: " + appointment.getId() + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		Doctor doctor = appointment.getDoctor();
		if (doctor != null) {
			if (doctor.getId() != null && doctorRepository.existsById(doctor.getId())) {
				optionalAppointment.get().setDoctor(doctorRepository.findById(doctor.getId()).get());
			}
		}

		if (appointment.getDateTime() != null)
			optionalAppointment.get().setDateTime(appointment.getDateTime());
		if (appointment.getStatus() != null)
			optionalAppointment.get().setStatus(appointment.getStatus());
		if (appointment.getVisitType() != null)
			optionalAppointment.get().setVisitType(appointment.getVisitType());
		return new ResponseEntity<>(optionalAppointment.get().toDTO(), HttpStatus.OK);
	}

}