package net.york.tsg;

import net.york.tsg.specialization.Specialization;
import net.york.tsg.specialization.SpecializationRepository;
import net.york.tsg.doctor.Doctor;
import net.york.tsg.doctor.DoctorRepository;
import net.york.tsg.patient.Patient;
import net.york.tsg.patient.PatientRepository;
import net.york.tsg.appointment.Appointment;
import net.york.tsg.appointment.AppointmentRepository;

import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Stream;
import java.util.List;
import java.time.LocalDateTime;
import java.lang.Math;

@Component
public class Initializer implements CommandLineRunner {
	
	private final SpecializationRepository specializationRepository;
	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;
	private final AppointmentRepository appointmentRepository;

	@Autowired
	public Initializer(
			SpecializationRepository specializationRepository,
			DoctorRepository doctorRepository,
			PatientRepository patientRepository,
			AppointmentRepository appointmentRepository) {
		this.specializationRepository = specializationRepository;
		this.doctorRepository = doctorRepository;
		this.patientRepository = patientRepository;
		this.appointmentRepository = appointmentRepository;
	}

	@Override
	public void run(String... strings) {
		Stream.of("Cardiology", "Pediatrics", "Dermatology", "Orthopedics", "Neurology")
			.forEach(name -> specializationRepository.save(new Specialization(name)));

		List<String> firstNames = List.of(
			"George", "Ashton", "Grace", "Franklin", "Martin",
			"Isaac", "Adam", "Catherine", "Barbara", "Walter",
			"Fredrick", "James", "Timothy", "Cole", "Crawford",
			"Savanah", "Jennifer", "Kamille", "Aaron", "Kay"
		);
		List<String> lastNames = List.of(
			"McGregor", "Balder", "Winthrop", "Howitt", "Shelton",
			"Jones", "Cook", "Barksdale", "Robertson", "Kennedy",
			"Johnson", "Holden", "Ryan", "Hill", "Lawritz",
			"Cross", "Rossman", "Beasley", "Nakano", "Simmons"
		);
		for (int i = 0;i < 20;i++) {
			doctorRepository.save(
				Doctor.builder()
					.firstName(firstNames.get(i))
					.lastName(lastNames.get(i))
					.specialization(specializationRepository.findById((long) ((Math.random() * 5) + 1)).get())
					.build());
		}

		firstNames = List.of("Joseph", "Kelly", "Jeremy", "Doulas", "John");
		lastNames = List.of("O'Donnell", "Flannigan", "Wimmer", "Wilson", "Smith");
		List<String> emails = List.of("joedonn@hotmail.com", "kflanners69@yahoo.com",
			"jwimmmmmm@hotmail.com", "douglaswouglas@gmail.com", "johnnysmiffy@proton.me");

		for (int i = 0;i < 5;i++) {
			patientRepository.save(
				Patient.builder()
					.firstName(firstNames.get(i))
					.lastName(lastNames.get(i))
					.email(emails.get(i))
					.dob(LocalDateTime.parse("2018-05-05T11:50:00"))
					.build()
			);
		}
	}

}