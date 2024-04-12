package tn.esprit.careerlink.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {


    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
     private final LogoutHandler logoutHandler;

    private static final String[] WHITE_LIST_URL = {
            "/api-docs",
            "/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html"};
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        HttpSecurity httpSecurity = http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource())
                )
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .requestMatchers(WHITE_LIST_URL).permitAll()
                                .requestMatchers("/auth/**")
                                .permitAll()
                                .requestMatchers("/User/**").hasAnyAuthority("Admin", "HR_manager")
                                // .requestMatchers("/Profile/**").hasAnyAuthority("Admin", "HR_manager")
                                .requestMatchers("/Expense/**").hasAnyAuthority("Admin", "Consultant")
                                .requestMatchers("/Stock/**").hasAnyAuthority("Admin", "Consultant", "Sales_manager")
                                .requestMatchers("/Client/**").hasAnyAuthority("Admin", "Sales_manager")
                                .requestMatchers("/Project/**").hasAnyAuthority("Admin", "Project_manager")
                                .requestMatchers("/Performance/**").hasAnyAuthority("Admin", "HR_manager","Consultant")
                                .requestMatchers("/Team/**").hasAnyAuthority("Admin", "HR_manager")
                                .requestMatchers("/Recruitment/**").hasAnyAuthority("Admin", "HR_manager")
                               // .requestMatchers("/TimeOffTracker/**").hasAnyAuthority("Admin", "HR_manager", "Consultant")
                               // .requestMatchers("/TimeOffTracker/add").hasAnyAuthority("Employee","Admin")

                                .anyRequest()
                                .authenticated()

                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
                ;

        return http.build();
    }

    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type","Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
