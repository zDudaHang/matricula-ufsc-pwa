package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Disciplina

data class TurmaMatriculadaDTO(
    val codigo : String,
    val vagasOfertadas : Int,
    val nomeProfessor: String,
    val disciplina: Disciplina
)
