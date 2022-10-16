package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.input

data class RegistrarAlunoInput(
    val nome: String?,
    val nomeUsuario: String?,
    val senha: String?,
    val iaa: Float?
)
