import { ApolloProvider } from '@apollo/client'
import { client } from './config/client'
import { LoginForm } from './login/LoginForm'

function App() {
  return (
    <ApolloProvider client={client}>
      <LoginForm />
    </ApolloProvider>
  )
}

export default App
