package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.config

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class WebSecurityConfiguration(
    private val alunoService: AlunoService
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
            .csrf()
            .disable()
            .authorizeRequests()
            .antMatchers( "/graphql").permitAll()
            .antMatchers( "/graphiql").permitAll()
            // .anyRequest()
            // .authenticated()
            .and()
            .httpBasic()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        return http.build()
    }
}