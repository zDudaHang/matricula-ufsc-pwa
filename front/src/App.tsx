import { ApolloProvider } from '@apollo/client'
import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { client } from './config/client'

function App() {
  return (
    <ApolloProvider client={client}>
      <ApplicationRoutes />
    </ApolloProvider>
  )
}

export default App
