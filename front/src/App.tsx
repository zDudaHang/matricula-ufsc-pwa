import { ApolloProvider } from '@apollo/client'
import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { client } from './config/client'
import { OnlineStatusProvider } from './online-status/OnlineStatusProvider'

function App() {
  return (
    <OnlineStatusProvider>
      <ApolloProvider client={client}>
        <ApplicationRoutes />
      </ApolloProvider>
    </OnlineStatusProvider>
  )
}

export default App
