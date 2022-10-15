package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.dto

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma

data class PerdaVagaDto(
    val aluno: Aluno,
    val turma: Turma
)
