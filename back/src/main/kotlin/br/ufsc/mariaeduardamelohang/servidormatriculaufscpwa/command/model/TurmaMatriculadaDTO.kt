package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.model

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Disciplina

data class TurmaMatriculadaDTO(
    val codigo : String,
    val vagasOfertadas : Int,
    val nomeProfessor: String,
    val disciplina: Disciplina
)
