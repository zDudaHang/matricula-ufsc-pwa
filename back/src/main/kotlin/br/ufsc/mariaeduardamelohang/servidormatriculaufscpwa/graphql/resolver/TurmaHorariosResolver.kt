package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarDiaSemanaById
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarHorarioById
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.DiaSemana
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Horario
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.TurmaHorarios
import graphql.kickstart.tools.GraphQLResolver
import org.springframework.stereotype.Component

@Component
class TurmaHorariosResolver(
    private val buscarDiaSemanaById: BuscarDiaSemanaById,
    private val buscarHorarioById: BuscarHorarioById
) : GraphQLResolver<TurmaHorarios> {

    fun diaSemana(turmaHorarios: TurmaHorarios): DiaSemana {
        return buscarDiaSemanaById.execute(turmaHorarios.id.diaSemana.id)
    }

    fun horario(turmaHorarios: TurmaHorarios): Horario {
        return buscarHorarioById.execute(turmaHorarios.id.horario.id)
    }

    fun sala(turmaHorarios: TurmaHorarios): String {
        return turmaHorarios.id.sala
    }
}