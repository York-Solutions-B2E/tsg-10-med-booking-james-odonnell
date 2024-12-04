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

	public ResponseEntity<?> getAllAppointmentsByUserEmail(String email) {
		List<Appointment> appointments = appointmentRepository.findAllByUserEmail(email);
		if (appointments.size() <= 0)
			return new ResponseEntity<>(
				"There are no appointments associated with the email provided.",
				HttpStatus.NOT_FOUND);

		return ResponseEntity.ok().body(appointments);
	}
	
	public ResponseEntity<?> getAllAppointmentsByDoctor(Doctor doctor) {
		if (doctor.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		if (doctorRepository.findById(doctor.getId()).isEmpty())
			return new ResponseEntity<>(
				"Error: no appointments found; doctor_id: " + doctor.getId() + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		Optional<List<Appointment>> optionalAppointments = appointmentRepository.findAllByDoctorId(doctor.getId());
		if (optionalAppointments.get().size() == 0)
			return new ResponseEntity<>(
				"Doctor: " + doctor.getId() + " has no appointments scheduled.",
				HttpStatus.OK
			);

		return new ResponseEntity<>(optionalAppointments, HttpStatus.OK);
	}

	public ResponseEntity<?> getAllAppointmentsByPatient(Patient patient) {
		if (patient.getId() == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		if (patientRepository.findById(patient.getId()).isEmpty())
			return new ResponseEntity<>(
				"Error: no appointments found; patient_id: " + patient.getId() + ", does not exist.",
				HttpStatus.NOT_FOUND
			);

		Optional<List<Appointment>> optionalAppointments = appointmentRepository.findAllByPatientId(patient.getId());
		if (optionalAppointments.get().size() == 0)
			return new ResponseEntity<>(
				"Patient: " + patient.getId() + " has no appointments scheduled.",
				HttpStatus.OK
			);

		return new ResponseEntity<>(optionalAppointments, HttpStatus.OK);
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
		if (appointment.getIsInPerson() != null)
			optionalAppointment.get().setIsInPerson(appointment.getIsInPerson());
		return new ResponseEntity<>(optionalAppointment.get(), HttpStatus.OK);
	}

}