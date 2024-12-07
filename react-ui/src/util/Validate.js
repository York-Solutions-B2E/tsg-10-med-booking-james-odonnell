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