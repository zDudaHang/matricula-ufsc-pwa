package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql

import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component

@Component
class AlunoQueryResolver : GraphQLQueryResolver {
    fun turma(id: Int) = 0
}