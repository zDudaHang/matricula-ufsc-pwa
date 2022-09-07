import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { JWT_LOCAL_STORAGE } from '../local-storage/model'

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem(JWT_LOCAL_STORAGE)
  operation.setContext({
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  })
  return forward(operation)
})

const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql' })

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
