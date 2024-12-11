import dayjs from 'dayjs';

export const validateName = (name) => {
	if (name === '')
		return false;
	const reg = new RegExp("[a-z|A-Z|'|-]");
	for (let i = 0;i < name.length;i++) {
		if (!reg.test(name.charAt(i)))
			return false;
	}
	return true;
}

export const validateEmail = (email) => {
	if (email === '')
		return false;
	let at = false;
	const reg = new RegExp("[a-z|A-Z|0-9|+|.|']");
	for (let i = 0;i < email.length;i++) {
		if (email.charAt(i) === '@') {
			if (at || i === 0)
				return false;
			at = true;
			continue;
		}
		if (!reg.test(email.charAt(i)))
			return false;
	}
	if (!at || email.charAt(email.length - 1) === '@')
		return false;
	return true;
}

export const dateConfilcts = (date, appointments, doctorId) => {
	let day = date.day();
	if (day === 0 || day === 6)
		return true;

	date = date.format("YYYY-MM-DD");
	if (appointments != null) {
		for (let i = 0;i < appointments.length;i++) {
			let apptDate = dayjs(appointments[i].dateTime).format("YYYY-MM-DD"); //get raw date/truncate time
			if (date === apptDate &&
					appointments[i].status !== "CANCELLED" &&
					appointments[i].doctor.id === doctorId) {
				return true;
			} //end date === apptDate && ...
		} //end for
	} //end if appointments !== null
}

export const timeConfilcts = (time, selectedDate, patientAppointments, doctorAppointments) => {
	time = time.format("hh:mm A");

	if (patientAppointments !== null) {
		for (let i = 0;i < patientAppointments.length;i++) {
			if (selectedDate !== dayjs(patientAppointments[i].dateTime).format("YYYY-MM-DD"))
				continue;
			let apptTime = dayjs(patientAppointments[i].dateTime).format("hh:mm A");
			if (time === apptTime &&
					patientAppointments[i].status !== "CANCELLED") {
				return true;
			} //end time === apptTime && ...
		} //end for
	} //end if patientAppointments !== null

	if (doctorAppointments !== null) {
		for (let i = 0;i < doctorAppointments.length;i++) {
			if (selectedDate !== dayjs(doctorAppointments[i].dateTime).format("YYYY-MM-DD"))
				continue;
			let apptTime = dayjs(doctorAppointments[i].dateTime).format("hh:mm A");
			if (time === apptTime && doctorAppointments[i].status !== "CANCELLED") {
				return true;
			} //end time === apptTime && ...
		} //end for
	} //end if doctorAppointments !== null
	return false;
}