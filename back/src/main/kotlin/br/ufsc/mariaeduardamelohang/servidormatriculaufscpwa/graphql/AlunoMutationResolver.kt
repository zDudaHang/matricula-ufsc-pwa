package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.LoginInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.LoginPayload
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.security.PublicAPI
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.JWTService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.util.AuthUtils.Companion.getAlunoAutenticado
import graphql.kickstart.tools.GraphQLMutationResolver

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class AlunoMutationResolver(
    private val alunoService: AlunoService,
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JWTService
) : GraphQLMutationResolver {

    /**
     * TODO:
     * - Usar o DataFetchingEnvironment para pegar o aluno que estah logado
     * - Apenas permitir acesso quando estiver logado
     * - Tratar o cenário: Já ter pedido uma matrícula antes
     */
    fun registrarPedidoMatricula(input: PedidoMatriculaInput): Long {
        val aluno = getAlunoAutenticado()
        return 0
    }

    @PublicAPI
    fun registrarAluno(input: RegistrarAlunoInput): Aluno? {
        return alunoService.registrarAluno(input)
    }

    @PublicAPI
    fun login(input: LoginInput): LoginPayload {
        val usernamePasswordAuthenticationToken = UsernamePasswordAuthenticationToken(input.nomeUsuario, input.senha)
        val authentication: Authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken)
        SecurityContextHolder.getContext().authentication = authentication
        val aluno: Aluno = authentication.principal as Aluno
        return LoginPayload(aluno.matricula, authentication.isAuthenticated, jwtService.generateToken(aluno.matricula))
    }
}