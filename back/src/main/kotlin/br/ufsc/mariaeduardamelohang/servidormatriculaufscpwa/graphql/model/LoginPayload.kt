package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model

import java.util.UUID

data class LoginPayload(
    val matriculaAluno: UUID? = null,
    val sucesso: Boolean,
    val accessToken: String? = null
)