package net.york.tsg.appointment;

import net.york.tsg.doctor.Doctor;
import net.york.tsg.doctor.DoctorRepository;

import net.york.tsg.patient.Patient;
import net.york.tsg.patient.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.List;
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

	public ResponseEntity<?> getAllAppointments() {
		return new ResponseEntity<>(
			appointmentRepository.findAll(),
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
		return ResponseEntity.ok().body(optionalAppointment.get());
	}

	// public ResponseEntity<?> getAllAppointmentsByUserEmail(String email) {
	// 	List<Appointment> appointments = appointmentRepository.findAllByUserEmail(email);
	// 	if (appointments.size() <= 0)
	// 		return new ResponseEntity<>(
	// 			"There are no appointments associated with the email provided.",
	// 			HttpStatus.NOT_FOUND);

	// 	return ResponseEntity.ok().body(appointments);
	// }
	
	public ResponseEntity<?> getAllAppointmentsByDoctor(Long doctorId) {
		if (doctorRepository.findById(doctorId).isEmpty())
			return new ResponseEntity<>(
				"Error: no appointments found; doctor_id: " + doctorId + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		List<Appointment> appointments = appointmentRepository.findAllByDoctorId(doctorId);
		if (appointments.size() == 0)
			return new ResponseEntity<>(
				"Doctor: " + doctorId + " has no appointments scheduled.",
				HttpStatus.OK
			);

		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	public ResponseEntity<?> getAllAppointmentsByPatient(Long patientId) {
		if (patientRepository.findById(patientId).isEmpty())
			return new ResponseEntity<>(
				"Error: no appointments found; patient_id: " + patientId + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		List<Appointment> appointments = appointmentRepository.findAllByPatientId(patientId);
		if (appointments.size() == 0)
			return new ResponseEntity<>(
				"Patient: " + patientId + " has no appointments scheduled.",
				HttpStatus.OK
			);

		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	public ResponseEntity<?> getAllAppointmentsByPatientEmail(String email) {
		Optional<Patient> optionalPatient = patientRepository.findByEmail(email);
		if (optionalPatient.isEmpty())
			return new ResponseEntity<>(
				"Error: email: " + email + " is not tied to any patients.",
				HttpStatus.NOT_FOUND
			);

		List<Appointment> appointments = appointmentRepository.findAllByPatientId(optionalPatient.get().getId());
		if (appointments.size() == 0)
			return new ResponseEntity<>(
				"Patient: " + optionalPatient.get().getId() + " has no appointments scheduled.",
				HttpStatus.OK
			);

		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	public ResponseEntity<?> scheduleNewAppointment(Appointment appointment) {
		Long doctor_id = appointment.getDoctor().getId();
		Optional<Doctor> optionalDoctor = doctorRepository.findById(doctor_id);
		if (optionalDoctor.isEmpty())
			return new ResponseEntity<>(
				"Error: could not schedule appointment; doctor_id: " + doctor_id + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		Long patient_id = appointment.getPatient().getId();
		Optional<Patient> optionalPatient = patientRepository.findById(patient_id);
		if (optionalPatient.isEmpty())
			return new ResponseEntity<>(
				"Error: could not schedule appointment; patient_id: " + patient_id + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		appointment.setDoctor(optionalDoctor.get());
		appointment.setPatient(optionalPatient.get());
		appointmentRepository.save(appointment);
		return new ResponseEntity<>(appointment, HttpStatus.OK);
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

		return new ResponseEntity<>(optionalAppointment.get(), HttpStatus.OK);
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
		return new ResponseEntity<>(optionalAppointment.get(), HttpStatus.OK);
	}

}