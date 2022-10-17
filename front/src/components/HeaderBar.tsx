import { Button, Heading, HFlow, Icon, useTheme } from 'bold-ui'
import { requestPermission, unsubscribeUser } from '../notifications/subscribe'
import { useNotificationStatus } from '../notifications/context/useNotificationStatus'

export function HeaderBar() {
  const theme = useTheme()
  const { isNotificationAllowed, setIsNotificationAllowed } = useNotificationStatus()

  const handleNotificationsClick = () => {
    if (isNotificationAllowed) unsubscribeUser(setIsNotificationAllowed)
    else requestPermission(setIsNotificationAllowed)
  }

  const handleDownloadClick = () => {
    console.debug('handleDownloadClick')
  }

  return (
    <HFlow
      style={{ background: theme.pallete.primary.c40, height: '3rem', paddingBottom: '1rem' }}
      justifyContent='center'
      alignItems='center'
    >
      <Heading level={1} style={{ color: theme.pallete.gray.c100 }}>
        Matrícula UFSC
      </Heading>{' '}
      <Button onClick={handleNotificationsClick} skin='ghost'>
        <Icon icon={isNotificationAllowed ? 'bellFilled' : 'bellOutline'} style={{ color: theme.pallete.gray.c100 }} />
      </Button>
      <Button onClick={handleDownloadClick} skin='ghost'>
        <Icon icon='download' style={{ color: theme.pallete.gray.c100 }} />
      </Button>
    </HFlow>
  )
}
