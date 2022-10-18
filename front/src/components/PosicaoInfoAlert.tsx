import { Alert } from 'bold-ui'
import { useAuthContext } from '../login/context/useAuthContext'

export function PosicaoInfoAlert() {
  const { iaa } = useAuthContext()
  return (
    <Alert type='info' inline>
      A posição em uma turma é determinada pelo Índice de Aproveitamento Semestral Acumulado (IAA). O seu é {iaa}
    </Alert>
  )
}
