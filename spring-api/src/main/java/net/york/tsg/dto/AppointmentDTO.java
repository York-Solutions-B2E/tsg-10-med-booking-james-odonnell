package net.york.tsg.dto;

import net.york.tsg.appointment.AppointmentStatus;
import net.york.tsg.appointment.AppointmentType;

import lombok.Data;
import lombok.Builder;

import java.time.Instant;

@Data
@Builder
public class AppointmentDTO {

	private Long id;
	private Long patientId;
	private Long doctorId;
	private Instant dateTime;
	private AppointmentStatus status;
	private AppointmentType visitType;

}