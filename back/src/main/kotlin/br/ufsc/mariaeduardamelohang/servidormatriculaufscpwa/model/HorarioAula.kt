package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import java.time.LocalTime
import javax.persistence.Embeddable

@Embeddable
data class HorarioAula(
    val diaSemana: DiaSemana,
    val horarioInicio: LocalTime,
    val horarioFinal: LocalTime
)