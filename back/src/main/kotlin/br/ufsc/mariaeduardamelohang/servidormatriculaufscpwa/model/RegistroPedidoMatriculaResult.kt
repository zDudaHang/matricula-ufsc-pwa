package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma

data class RegistroPedidoMatriculaResult(
    val turmasNovas: MutableList<Turma> = mutableListOf(),
    val turmasMantidas: MutableList<Turma> = mutableListOf(),
    val turmasRemovidas: MutableList<Turma> = mutableListOf()
) {
    fun getTurmasMatriculadas() : MutableList<Turma> {
        val turmasMatriculadas =  mutableListOf<Turma>()
        turmasMatriculadas.addAll(turmasNovas)
        turmasMatriculadas.addAll(turmasMantidas)
        return turmasMatriculadas
    }
}
