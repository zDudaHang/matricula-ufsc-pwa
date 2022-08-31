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
    fun registrarPedidoMatricula(input: PedidoMatriculaInput): Long {
        return 0
    }

    fun registrarAluno(input: RegistrarAlunoInput): Aluno? {
        return alunoService.registrarAluno(input)
    }
}