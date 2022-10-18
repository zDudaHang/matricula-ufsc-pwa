import { Button, Heading, HFlow, Icon, Text, useTheme } from 'bold-ui'
import { requestPermission, unsubscribeUser } from '../notifications/subscribe'
import { useNotificationStatus } from '../notifications/context/useNotificationStatus'
import { useInstall } from '../install/useInstall'

export function HeaderBar() {
  const theme = useTheme()
  const { isNotificationAllowed, setIsNotificationAllowed } = useNotificationStatus()
  const { deferredPrompt, reset } = useInstall()

  const handleNotificationsClick = () => {
    if (isNotificationAllowed) unsubscribeUser(setIsNotificationAllowed)
    else requestPermission(setIsNotificationAllowed)
  }

  // https://www.amitmerchant.com/adding-custom-install-button-in-progressive-web-apps/
  const handleDownloadClick = async () => {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.debug(`[HeaderBar.tsx] userChoice: ${outcome}`)
    switch (outcome) {
      case 'accepted': {
        reset()
        break
      }
    }
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
      {deferredPrompt && (
        <Button onClick={handleDownloadClick} skin='ghost'>
          <HFlow hSpacing={0.25} alignItems='center'>
            <Icon icon='download' style={{ color: theme.pallete.gray.c100 }} />
            <Text style={{ color: theme.pallete.gray.c100 }}>Instalar</Text>
          </HFlow>
        </Button>
      )}
    </HFlow>
  )
}
