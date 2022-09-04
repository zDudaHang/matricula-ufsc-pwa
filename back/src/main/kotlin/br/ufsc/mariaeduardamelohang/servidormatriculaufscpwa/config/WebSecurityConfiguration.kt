package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.config

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.security.jwt.JWTFilter
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class WebSecurityConfiguration(
    private val alunoService: AlunoService,
    private val jwtFilter: JWTFilter
)  {

    @Bean
    @Throws(Exception::class)
    fun authenticationManager(authenticationConfiguration: AuthenticationConfiguration): AuthenticationManager {
        return authenticationConfiguration.authenticationManager
    }

    @Bean
    @Throws(java.lang.Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .userDetailsService(alunoService)
            .csrf().disable()
            .authorizeRequests()
            .antMatchers( "/graphql").permitAll()
            .antMatchers("/graphiql", "/vendor/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }
}