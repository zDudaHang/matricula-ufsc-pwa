package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.TurmaSolicitada
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component

@Component
class AlunoQueryResolver(
    private val alunoService: AlunoService
) : GraphQLQueryResolver {
    fun buscarPedidoMatricula() : List<TurmaSolicitada> {
        return alunoService.buscarPedidoMatricula()
    }
}