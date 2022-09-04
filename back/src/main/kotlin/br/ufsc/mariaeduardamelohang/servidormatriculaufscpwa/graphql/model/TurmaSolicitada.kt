package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma

data class TurmaSolicitada(
    val statusSolicitacaoEnum: StatusSolicitacaoEnum? = null,
    val turma: Turma,
    val posicaoNaFilaEspera: Int? = null
)
