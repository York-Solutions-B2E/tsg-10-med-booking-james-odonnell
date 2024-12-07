package net.york.tsg.appointment;

import net.york.tsg.doctor.Doctor;
import net.york.tsg.patient.Patient;
import net.york.tsg.dto.DTOMapper;
import net.york.tsg.dto.AppointmentDTO;

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


import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
@Entity
@Table(name = "appointments")
public class Appointment implements DTOMapper<AppointmentDTO> {

    @Id
    @GeneratedValue
    @Column(name = "appointment_id")
    private Long id;

    @NotNull
    private Instant dateTime;

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

    private AppointmentStatus status = AppointmentStatus.CONFIRMED;
    private AppointmentType visitType = AppointmentType.IN_PERSON;

    public AppointmentDTO toDTO() {
        return AppointmentDTO.builder()
            .id(id)
            .patientId(patient.getId())
            .doctor(doctor)
            .dateTime(dateTime)
            .status(status)
            .visitType(visitType)
            .build();
    }

}