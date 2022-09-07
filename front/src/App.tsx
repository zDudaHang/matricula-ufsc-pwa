import { ApolloProvider } from '@apollo/client'
import { AppRootView } from './AppRootView'
import { client } from './config/client'

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRootView />
    </ApolloProvider>
  )
}

export default App
