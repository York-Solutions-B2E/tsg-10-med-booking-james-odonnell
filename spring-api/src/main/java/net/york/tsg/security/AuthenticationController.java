package net.york.tsg.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    // Example of a role restricted endpoint
    // @PreAuthorize("hasAnyAuthority('Admin','Patients')")
    // @GetMapping("/api/auth/permissions")
    // public ResponseEntity<?> getUserPermissions(@AuthenticationPrincipal OAuth2User user) {
    //     if (user == null) {
    //         return new ResponseEntity<>("", HttpStatus.OK);
    //     } else {
    //         System.out.println(user.getAuthorities());
    //         return ResponseEntity.ok().body(user.getAuthorities());
    //     }
    // }

    @GetMapping("/api/auth")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OAuth2User user) {
        return authenticationService.getUser(user);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request,
            @AuthenticationPrincipal(expression = "idToken") OidcIdToken idToken) {
        return authenticationService.logout(request, idToken);
    }

}
