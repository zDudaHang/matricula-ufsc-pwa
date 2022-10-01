package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarTurmasQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component

@Component
class TurmaQueryResolver(
    private val buscarTurmasQuery: BuscarTurmasQuery
) : GraphQLQueryResolver {
    fun turmas(): List<Turma> {
        return buscarTurmasQuery.execute()
    }
}