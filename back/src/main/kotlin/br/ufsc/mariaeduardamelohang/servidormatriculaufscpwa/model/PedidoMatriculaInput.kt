package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

data class PedidoMatriculaInput(
    val turmas: List<String>,
    // Atributo criado apenas para colocar o erro no campo correto
    val horarios: String? = null
)
