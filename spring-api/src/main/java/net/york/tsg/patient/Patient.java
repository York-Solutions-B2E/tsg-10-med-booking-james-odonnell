package net.york.tsg.patient;

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
import jakarta.validation.constraints.NotBlank;
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
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue
    @Column(name = "patient_id")
    private Long id;
    @NotBlank
    private String email;

	@NotBlank
    private String firstName;
    @NotBlank
    private String lastName;

    @NotNull
    private LocalDateTime dob;

}