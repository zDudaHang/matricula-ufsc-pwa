package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.context.AuthGraphQLContext
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.LoginInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.LoginPayload
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import graphql.GraphQLContext
import graphql.kickstart.tools.GraphQLMutationResolver
import graphql.schema.DataFetchingEnvironment

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component

@Component
class AlunoMutationResolver(
    private val alunoService: AlunoService,
    private val authenticationManager: AuthenticationManager,
) : GraphQLMutationResolver {

    /**
     * TODO:
     * - Usar o DataFetchingEnvironment para pegar o aluno que estah logado
     * - Apenas permitir acesso quando estiver logado
     * - Tratar o cenário: Já ter pedido uma matrícula antes
     */
    fun registrarPedidoMatricula(input: PedidoMatriculaInput, env: DataFetchingEnvironment): Long {
        val ctx : GraphQLContext = env.graphQlContext
        ctx.
        return 0
    }

    // TODO: Deixar essa parte da API como pública
    fun registrarAluno(input: RegistrarAlunoInput): Aluno? {
        return alunoService.registrarAluno(input)
    }

    fun login(input: LoginInput): LoginPayload {
        val usernamePasswordAuthenticationToken = UsernamePasswordAuthenticationToken(input.nomeUsuario, input.senha)
        val authentication: Authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken)
        val aluno: Aluno = authentication.principal as Aluno
        return LoginPayload(aluno.matricula, authentication.isAuthenticated)
    }
}