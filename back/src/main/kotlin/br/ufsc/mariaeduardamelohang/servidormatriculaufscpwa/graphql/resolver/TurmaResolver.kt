package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.NomeProfessorByIdQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import graphql.kickstart.tools.GraphQLResolver
import org.springframework.stereotype.Component

@Component
class TurmaResolver(
    private val nomeProfessorByIdQuery: NomeProfessorByIdQuery,
) : GraphQLResolver<Turma> {

    fun nomeProfessor(turma: Turma) : String {
        return nomeProfessorByIdQuery.execute(turma.professor.id)
    }
}