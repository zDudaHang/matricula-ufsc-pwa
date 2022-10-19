import { HFlow, Icon, VFlow } from 'bold-ui'
import { useEffect, useMemo, useState } from 'react'
import { ButtonLink } from '../components/ButtonLink'
import { fetchWithAuthorization } from '../fetch'
import { TurmaMatriculada } from '../grade-horarios/model'
import { PEDIDO_MATRICULA_ROUTE } from '../routes/routes'
import { RegistrarPedidoMatriculaForm } from './RegistrarPedidoMatriculaForm'
import { convertTurmasMatriculadasToHorariosSelecionados } from './util'

export function RegistrarPedidoMatriculaView() {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<TurmaMatriculada[]>([])

  useEffect(() => {
    fetchWithAuthorization('pedidoMatricula').then((response) =>
      response.json().then((turmas: TurmaMatriculada[]) => setTurmasMatriculadas(turmas))
    )
  }, [])

  const horariosSelecionados = useMemo(
    () => convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas, false),
    [turmasMatriculadas]
  )

  return (
    <VFlow vSpacing={0} style={{ margin: '1rem' }}>
      <ButtonLink path={PEDIDO_MATRICULA_ROUTE} kind='normal' skin='ghost' size='large'>
        <HFlow hSpacing={0.5}>
          <Icon icon='arrowLeft' />
          Voltar
        </HFlow>
      </ButtonLink>
      <RegistrarPedidoMatriculaForm
        turmasMatriculadas={turmasMatriculadas}
        horariosSelecionados={horariosSelecionados}
      />
    </VFlow>
  )
}
