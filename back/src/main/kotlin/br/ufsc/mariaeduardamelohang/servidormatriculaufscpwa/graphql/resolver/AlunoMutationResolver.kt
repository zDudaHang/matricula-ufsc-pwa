package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.LoginInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.LoginPayload
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.security.PublicAPI
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AuthenticationService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.JWTService
import graphql.kickstart.tools.GraphQLMutationResolver

import org.springframework.stereotype.Component

@Component
class AlunoMutationResolver(
    private val alunoService: AlunoService,
    private val jwtService: JWTService,
    private val authenticationService: AuthenticationService
) : GraphQLMutationResolver {

    fun registrarPedidoMatricula(input: PedidoMatriculaInput): List<Turma> {
        return alunoService.registrarPedidoMatricula(input)
    }

    @PublicAPI
    fun registrarAluno(input: RegistrarAlunoInput): Aluno? {
        return alunoService.registrarAluno(input)
    }

    @PublicAPI
    fun login(input: LoginInput): LoginPayload {
        val authentication = authenticationService.authenticate(input)
        val aluno: Aluno = authentication.principal as Aluno
        return LoginPayload(
            aluno.matricula,
            authentication.isAuthenticated,
            jwtService.generateToken(aluno.matricula)
        )
    }
}