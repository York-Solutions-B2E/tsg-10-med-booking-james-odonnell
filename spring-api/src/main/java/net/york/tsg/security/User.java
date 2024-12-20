package net.york.tsg.security;

import lombok.Data;

import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;
import java.util.List;

@Data
public class User {

	private Long id;
	private String email;
	private String firstName;
	private String lastName;
	private Boolean admin;

	public User(OAuth2User user) {
		id = 0L;
		admin = false;
		email = user.getAttribute("email");
		firstName = user.getAttribute("given_name");
		lastName = user.getAttribute("family_name");
		List<String> groups = user.getAttribute("groups");
		for (String group : groups) {
			if (group.equals("Admin")) {
				admin = true;
				break;
			}
		}
	}

}