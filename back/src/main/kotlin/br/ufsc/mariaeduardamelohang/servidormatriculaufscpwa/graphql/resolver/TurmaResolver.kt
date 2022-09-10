package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarHorariosQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarHorariosTurmaByCodigo
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.NomeProfessorByIdQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.TurmaHorarios
import graphql.kickstart.tools.GraphQLResolver
import org.springframework.stereotype.Component

@Component
class TurmaResolver(
    private val nomeProfessorByIdQuery: NomeProfessorByIdQuery,
    private val buscarHorariosTurmaByCodigo: BuscarHorariosTurmaByCodigo
) : GraphQLResolver<Turma> {

    fun nomeProfessor(turma: Turma) : String {
        return nomeProfessorByIdQuery.execute(turma.professor.id)
    }

    fun horarios(turma: Turma): List<TurmaHorarios> {
        val horarios = buscarHorariosTurmaByCodigo.execute(turma.codigo)
        return horarios
    }
}