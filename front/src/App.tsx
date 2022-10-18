import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { OnlineStatusProvider } from './online-status/OnlineStatusProvider'
import { VFlow } from 'bold-ui'
import { HeaderBar } from './components/HeaderBar'
import { PushNotificationsAlert } from './components/PushNotificationsAlert'
import { NotificationStatusProvider } from './notifications/context/NotificationStatusProvider'

function App() {
  return (
    <OnlineStatusProvider>
      <NotificationStatusProvider>
        <VFlow vSpacing={0}>
          <PushNotificationsAlert />
          <HeaderBar />
          <ApplicationRoutes />
        </VFlow>
      </NotificationStatusProvider>
    </OnlineStatusProvider>
  )
}

export default App
