package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.context

import graphql.GraphQLContext
import graphql.kickstart.execution.context.DefaultGraphQLContext
import graphql.kickstart.servlet.context.DefaultGraphQLServletContext
import graphql.kickstart.servlet.context.DefaultGraphQLWebSocketContext
import graphql.kickstart.servlet.context.GraphQLServletContextBuilder
import org.dataloader.BatchLoader
import org.dataloader.DataLoader
import org.dataloader.DataLoaderRegistry
import java.util.concurrent.CompletableFuture
import java.util.function.Supplier
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.websocket.Session
import javax.websocket.server.HandshakeRequest

class AuthGraphQLContextBuilder : GraphQLServletContextBuilder {
    override fun build(req: HttpServletRequest?, response: HttpServletResponse?): GraphQLContext? {
        return DefaultGraphQLServletContext.createServletContext(buildDataLoaderRegistry(), null).with(req).with(response)
            .build()
    }

    override fun build(): GraphQLContext? {
        return DefaultGraphQLContext(buildDataLoaderRegistry(), null)
    }

    override fun build(session: Session?, request: HandshakeRequest?): GraphQLContext? {
        return DefaultGraphQLWebSocketContext.createWebSocketContext(buildDataLoaderRegistry(), null).with(session)
            .with(request).build()
    }

    private fun buildDataLoaderRegistry(): DataLoaderRegistry? {
        val dataLoaderRegistry = DataLoaderRegistry()
        dataLoaderRegistry.register("customerDataLoader",
            DataLoader(BatchLoader<Int?, String> { customerIds: List<Int?>? ->
                CompletableFuture.supplyAsync(Supplier {
                    customerRepository.getUserNamesForIds(
                        customerIds
                    )
                })
            })
        )
        return dataLoaderRegistry
    }
}