package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Aluno

data class LoginPayload(
    val aluno : Aluno? = null,
    val sucesso: Boolean,
    val accessToken: String? = null
)