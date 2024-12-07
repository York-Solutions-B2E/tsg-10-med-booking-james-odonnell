package net.york.tsg.security;

import net.york.tsg.patient.Patient;
import net.york.tsg.patient.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
	
	private final PatientRepository patientRepository;
	private final ClientRegistration registration;

	@Autowired
	public AuthenticationService(
			PatientRepository patientRepository,
			ClientRegistrationRepository registrations) {
		this.patientRepository = patientRepository;
		this.registration = registrations.findByRegistrationId("okta");
	}

	public ResponseEntity<?> getUser(OAuth2User oAuth2User) {
		if (oAuth2User == null) {
            return new ResponseEntity<>("User not authenticated.", HttpStatus.NOT_FOUND);
        } else {
        	User appUser = new User(oAuth2User);
            return ResponseEntity.ok().body(appUser);
        }
	}

	public ResponseEntity<?> logout(
            HttpServletRequest request,
            @AuthenticationPrincipal(expression = "idToken") OidcIdToken idToken) {

        // send logout URL to client so they can initiate logout
        String logoutUrl = this.registration.getProviderDetails()
            .getConfigurationMetadata().get("end_session_endpoint").toString();

        Map<String, String> logoutDetails = new HashMap<>();
        logoutDetails.put("logoutUrl", logoutUrl);
        logoutDetails.put("idToken", idToken.getTokenValue());
        request.getSession(false).invalidate();
        return ResponseEntity.ok().body(logoutDetails);
    }
	
}