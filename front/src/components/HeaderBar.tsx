import { Button, Heading, HFlow, Icon, Text, useTheme } from 'bold-ui'
import { requestPermission, unsubscribeUser } from '../notifications/subscribe'
import { useInstall } from '../install/useInstall'
import { OnlyOnlineFeature } from '../online-status/OnlyOnlineFeature'
import { useAuthContext } from '../login/context/useAuthContext'

export function HeaderBar() {
  const theme = useTheme()
  const { auth, setIsNotificationAllowedAuthUser } = useAuthContext()
  const { deferredPrompt, reset } = useInstall()

  const handleNotificationsClick = () => {
    if (auth?.isNotificationAllowed) unsubscribeUser(setIsNotificationAllowedAuthUser)
    else requestPermission(setIsNotificationAllowedAuthUser)
  }

  // https://www.amitmerchant.com/adding-custom-install-button-in-progressive-web-apps/
  const handleDownloadClick = async () => {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.debug(`[HeaderBar] userChoice: ${outcome}`)
    if (outcome === 'accepted') reset()
  }

  return (
    <HFlow
      style={{ background: theme.pallete.primary.c40, height: '4rem', padding: '1rem 0 1rem 0' }}
      justifyContent='center'
      alignItems='center'
    >
      <Heading level={1} style={{ color: theme.pallete.gray.c100 }}>
        Matrícula UFSC
      </Heading>{' '}
      <OnlyOnlineFeature>
        <Button onClick={handleNotificationsClick} skin='ghost' size='large'>
          <Icon
            icon={auth?.isNotificationAllowed ? 'bellFilled' : 'bellOutline'}
            style={{ color: theme.pallete.gray.c100 }}
          />
        </Button>
        {deferredPrompt && (
          <Button onClick={handleDownloadClick} skin='ghost' size='large'>
            <HFlow hSpacing={0.25} alignItems='center'>
              <Icon icon='download' style={{ color: theme.pallete.gray.c100 }} />
              <Text style={{ color: theme.pallete.gray.c100 }}>Instalar</Text>
            </HFlow>
          </Button>
        )}
      </OnlyOnlineFeature>
    </HFlow>
  )
}
