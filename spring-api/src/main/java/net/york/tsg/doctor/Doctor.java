package net.york.tsg.doctor;

import net.york.tsg.specialization.Specialization;

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
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue
    @Column(name = "doctor_id")
    private Long id;
    
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotNull
    @ManyToOne
    @JoinColumn(
        name = "specialization_id",
        referencedColumnName = "specialization_id"
    )
    private Specialization specialization;
    
}