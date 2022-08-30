package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import java.io.Serializable
import javax.persistence.Embeddable
import javax.persistence.MapsId
import javax.persistence.OneToOne

@Embeddable
data class TurmaHorariosPrimaryKey(
    @OneToOne
    @MapsId
    val turma: Turma,

    @OneToOne
    @MapsId
    val diaSemana: DiaSemana,

    @OneToOne
    @MapsId
    val horarioInicio: Horario,

    @OneToOne
    @MapsId
    val horarioFinal: Horario
) : Serializable
