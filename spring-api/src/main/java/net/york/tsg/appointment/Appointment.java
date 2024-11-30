package net.york.tsg;

import net.york.tsg.doctor.Doctor;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.NotBlank;


import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @Column(name = "appointment_id")
    @SequenceGenerator(
    	name = "appointment_sequence",
    	sequenceName = "appointment_sequence",
    	allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "appointment_id_sequence"
    )
    private Long id;

    @NotBlank
    private Instant date;

    @NotBlank
    @ManyToOne
    @JoinColumn(
    	name = "doctor_id",
    	referencedColumnName = "doctor_id"
    )
    private Doctor doctor;

}