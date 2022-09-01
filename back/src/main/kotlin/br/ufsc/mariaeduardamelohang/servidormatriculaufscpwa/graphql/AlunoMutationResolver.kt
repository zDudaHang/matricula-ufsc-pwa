package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component

@Component
class AlunoMutationResolver(
    private val alunoService: AlunoService
) : GraphQLMutationResolver {

    /**
     * TODO:
     * - Usar o DataFetchingEnvironment para pegar o aluno que estah logado
     * - Apenas permitir acesso quando estiver logado
     * - Tratar o cenário: Já ter pedido uma matrícula antes
     */
    fun registrarPedidoMatricula(input: PedidoMatriculaInput): Long {
        return 0
    }

    // TODO: Deixar essa parte da API como pública
    fun registrarAluno(input: RegistrarAlunoInput): Aluno? {
        return alunoService.registrarAluno(input)
    }
}