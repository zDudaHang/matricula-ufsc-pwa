import { Alert } from 'bold-ui'
import { useOnlineStatus } from '../online-status/useOnlineStatus'

export function OnlineStatusAlert() {
  const isOnline = useOnlineStatus()

  return (
    !isOnline && (
      <Alert type='warning' onCloseClick={console.log}>
        Você está offline, algumas funcionalidades foram desativadas e informações desatualizadas
      </Alert>
    )
  )
}
