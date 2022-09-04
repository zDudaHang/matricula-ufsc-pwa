package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.resolver

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.StatusSolicitacaoEnum
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.TurmaSolicitada
import graphql.kickstart.tools.GraphQLResolver
import org.springframework.stereotype.Component

@Component
class TurmaSolicitadaResolver : GraphQLResolver<TurmaSolicitada> {

    fun status(turmaSolicitada: TurmaSolicitada) : StatusSolicitacaoEnum? {
        return turmaSolicitada.statusSolicitacaoEnum
    }
}