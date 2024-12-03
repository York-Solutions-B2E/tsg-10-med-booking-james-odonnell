package net.york.tsg.appointment;

import net.york.tsg.doctor.Doctor;
import net.york.tsg.patient.Patient;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.NotNull;


import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue
    @Column(name = "appointment_id")
    private Long id;

    @NotNull
    private LocalDateTime dateTime;

    @NotNull
    @ManyToOne
    @JoinColumn(
    	name = "doctor_id",
    	referencedColumnName = "doctor_id"
    )
    private Doctor doctor;

    @NotNull
    @ManyToOne
    @JoinColumn(
        name = "patient_id",
        referencedColumnName = "patient_id"
    )
    private Patient patient;

    private AppointmentStatus status = AppointmentStatus.PENDING;
    private Boolean isInPerson = true;

}