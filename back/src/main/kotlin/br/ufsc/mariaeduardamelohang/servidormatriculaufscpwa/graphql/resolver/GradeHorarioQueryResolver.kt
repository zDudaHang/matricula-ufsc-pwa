package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarDiasSemanaQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarHorariosQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.DiaSemana
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Horario
import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component

@Component
class GradeHorarioQueryResolver(
    private val buscarHorariosQuery: BuscarHorariosQuery,
    private val buscarDiasSemanaQuery: BuscarDiasSemanaQuery
) : GraphQLQueryResolver {

    fun horarios(): List<Horario> {
        return buscarHorariosQuery.execute()
    }

    fun diasSemana(): List<DiaSemana> {
        return buscarDiasSemanaQuery.execute()
    }
}