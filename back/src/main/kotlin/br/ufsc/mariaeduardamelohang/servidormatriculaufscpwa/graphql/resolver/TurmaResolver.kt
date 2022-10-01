package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarHorariosTurmaByCodigo
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.NomeProfessorByIdQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.TurmaHorarios
import graphql.kickstart.tools.GraphQLResolver
import org.springframework.stereotype.Component

@Component
class TurmaResolver(
    private val nomeProfessorByIdQuery: NomeProfessorByIdQuery,
    private val buscarHorariosTurmaByCodigo: BuscarHorariosTurmaByCodigo
) : GraphQLResolver<Turma> {

    fun nomeProfessor(turma: Turma): String {
        return nomeProfessorByIdQuery.execute(turma.professor.id)
    }

    fun horarios(turma: Turma): List<TurmaHorarios> {
        return buscarHorariosTurmaByCodigo.execute(turma.codigo)
    }
}