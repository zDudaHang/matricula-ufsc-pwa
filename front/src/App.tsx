import { ApolloProvider } from '@apollo/client'
import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { client } from './config/client'
import { OnlineStatusProvider } from './online-status/OnlineStatusProvider'
import { VFlow } from 'bold-ui'
import { HeaderBar } from './components/HeaderBar'

function App() {
  return (
    <OnlineStatusProvider>
      <ApolloProvider client={client}>
        <VFlow>
          <HeaderBar />
          <ApplicationRoutes />
        </VFlow>
      </ApolloProvider>
    </OnlineStatusProvider>
  )
}

export default App
