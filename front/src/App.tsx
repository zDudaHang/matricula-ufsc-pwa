import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { OnlineStatusProvider } from './online-status/OnlineStatusProvider'
import { VFlow } from 'bold-ui'
import { HeaderBar } from './components/HeaderBar'
import { PushNotificationsAlert } from './components/PushNotificationsAlert'
import { NotificationStatusProvider } from './notifications/context/NotificationStatusProvider'
import { AuthProvider } from './login/context/AuthProvider'

function App() {
  return (
    <OnlineStatusProvider>
      <NotificationStatusProvider>
        <AuthProvider>
          <VFlow vSpacing={0}>
            <PushNotificationsAlert />
            <HeaderBar />
            <ApplicationRoutes />
          </VFlow>
        </AuthProvider>
      </NotificationStatusProvider>
    </OnlineStatusProvider>
  )
}

export default App
