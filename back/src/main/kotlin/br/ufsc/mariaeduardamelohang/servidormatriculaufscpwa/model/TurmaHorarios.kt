package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import java.io.Serializable
import javax.persistence.EmbeddedId
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "TB_TURMA_HORARIOS")
data class TurmaHorarios(
    @EmbeddedId
    val id: TurmaHorariosPrimaryKey
) : Serializable
