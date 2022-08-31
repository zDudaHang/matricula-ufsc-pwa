package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.PedidoMatriculaInput
import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component

@Component
class AlunoMutationResolver : GraphQLMutationResolver {
    fun registrarPedidoMatricula(input: PedidoMatriculaInput): Long {
        return 0
    }
}