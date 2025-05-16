package br.com.fasttask.fasttask.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa CSRF para chamadas REST
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // Permite todos os endpoints
                .anyRequest().authenticated()
            )
            .formLogin(login -> login.disable()) // Desativa formulário de login padrão
            .httpBasic(basic -> basic.disable()); // Desativa autenticação básica

        return http.build();
    }
}
