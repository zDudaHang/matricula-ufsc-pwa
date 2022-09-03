package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.security.jwt

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.getAuthorizationHeader
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.JWTService
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException
import java.util.UUID
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JWTFilter(
    private val jwtService: JWTService,
    private val alunoService: AlunoService
) : OncePerRequestFilter() {

    private val BEARER = "Bearer "

    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        val accessToken: String? = getTokenFromHeader(request)
        if (accessToken != null) {
            if (jwtService.isAccessTokenValid(accessToken)) authenticate(accessToken)
            filterChain.doFilter(request, response)
        }
    }

    private fun authenticate(tokenFromHeader: String) {
        val matricula = jwtService.getMatricula(tokenFromHeader)
        if (matricula != null) {
            val aluno = alunoService.buscarAlunoPelaMatricula(matricula)
            val usernamePasswordAuthenticationToken = UsernamePasswordAuthenticationToken(aluno, null, null)
            SecurityContextHolder.getContext().authentication = usernamePasswordAuthenticationToken
        }
    }

    private fun getTokenFromHeader(request: HttpServletRequest): String? {
        val accessToken = request.getAuthorizationHeader()
        return if (accessToken == null || accessToken.isEmpty() || !accessToken.startsWith(BEARER)) {
            null
        } else accessToken.substring(BEARER.length, accessToken.length)
    }
}