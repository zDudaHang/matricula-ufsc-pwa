import { Heading, HFlow, Icon, useTheme } from 'bold-ui'
import { useOnlineStatus } from '../online-status/useOnlineStatus'

export function HeaderBar() {
  const theme = useTheme()
  const isOnline = useOnlineStatus()

  return (
    <HFlow
      style={{ background: theme.pallete.primary.c40, height: '3rem', paddingBottom: '0.5rem' }}
      justifyContent='center'
      alignItems='center'
    >
      <Heading level={1} style={{ color: theme.pallete.gray.c100 }}>
        Matrícula UFSC - PWA
      </Heading>{' '}
      {!isOnline && (
        <HFlow alignItems='center' hSpacing={0.5}>
          <Icon icon='exclamationTriangleFilled' style={{ color: theme.pallete.gray.c100 }} />
          <Heading level={4} style={{ color: theme.pallete.gray.c100 }}>
            Você está offline, algumas funcionalidades foram desativadas e informações desatualizadas
          </Heading>
        </HFlow>
      )}
    </HFlow>
  )
}
