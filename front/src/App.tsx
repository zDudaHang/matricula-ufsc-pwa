import { ApolloProvider } from '@apollo/client'
import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { client } from './config/client'
import { OnlineStatusProvider } from './online-status/OnlineStatusProvider'
import { VFlow } from 'bold-ui'
import { HeaderBar } from './components/HeaderBar'
import { OnlineStatusAlert } from './components/OnlineStatusAlert'
import { PushNotificationsAlert } from './components/PushNotificationsAlert'
import { NotificationStatusProvider } from './notifications/context/NotificationStatusProvider'

function App() {
  return (
    <OnlineStatusProvider>
      <NotificationStatusProvider>
        <ApolloProvider client={client}>
          <VFlow vSpacing={0}>
            <OnlineStatusAlert />
            <PushNotificationsAlert />
            <HeaderBar />
            <ApplicationRoutes />
          </VFlow>
        </ApolloProvider>
      </NotificationStatusProvider>
    </OnlineStatusProvider>
  )
}

export default App
