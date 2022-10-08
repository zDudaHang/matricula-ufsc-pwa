import { Button, Heading, HFlow, Icon, useTheme } from 'bold-ui'
import { requestPermission } from './subscribe'

export function HeaderBar() {
  const theme = useTheme()

  const handleNotificationsClick = () => {
    requestPermission()
  }

  const permission = Notification.permission

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
        <Icon
          icon={permission === 'granted' ? 'bellFilled' : 'bellOutline'}
          style={{ color: theme.pallete.gray.c100 }}
        />
      </Button>
    </HFlow>
  )
}
