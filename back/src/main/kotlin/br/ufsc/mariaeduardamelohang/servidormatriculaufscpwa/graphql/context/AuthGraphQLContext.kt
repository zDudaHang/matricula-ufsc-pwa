package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.context

import graphql.GraphQLContext
import graphql.kickstart.execution.context.GraphQLKickstartContext
import graphql.kickstart.servlet.context.GraphQLServletContext
import org.dataloader.DataLoaderRegistry
import java.nio.file.attribute.UserPrincipal

class AuthGraphQLContext(private val userPrincipal:  UserPrincipal?) : GraphQLServletContext {
    override fun getDataLoaderRegistry(): DataLoaderRegistry {
        TODO("Not yet implemented")
    }

    override fun getMapOfContext(): MutableMap<Any, Any> {
        TODO("Not yet implemented")
    }
}