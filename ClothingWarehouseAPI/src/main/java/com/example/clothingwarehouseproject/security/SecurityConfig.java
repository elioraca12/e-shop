package com.example.clothingwarehouseproject.security;

import com.example.clothingwarehouseproject.filter.AuthenticationFilter;
import com.example.clothingwarehouseproject.filter.AuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@CrossOrigin("*")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        AuthenticationFilter authFilter =
                new AuthenticationFilter(authenticationManagerBean());

        http
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers( "/login").permitAll().and()
                .authorizeRequests().antMatchers( "/api/user/post").permitAll().and()
                .authorizeRequests().antMatchers( "/api/role/get").permitAll().and()
                .authorizeRequests().antMatchers("/api/size/**").hasAnyAuthority("ROLE_SUPER_ADMIN").and()
                .authorizeRequests().antMatchers("/api/size-naming/**").hasAnyAuthority("ROLE_SUPER_ADMIN").and()
                .authorizeRequests().antMatchers("/api/inventory/get-all").hasAnyAuthority("ROLE_SUPER_ADMIN","ROLE_USER").and()
                .authorizeRequests().anyRequest().authenticated().and()
                .addFilter(authFilter)
                .addFilterBefore(new AuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList(CorsConfiguration.ALL));
        configuration.setAllowedHeaders(Collections.singletonList(CorsConfiguration.ALL));
        configuration.setAllowedMethods(Collections.singletonList(CorsConfiguration.ALL));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;

    }

}


