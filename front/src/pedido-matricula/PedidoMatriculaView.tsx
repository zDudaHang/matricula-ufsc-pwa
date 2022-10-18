import { Cell, Grid, Heading, HFlow } from 'bold-ui'
import { useEffect, useCallback, useState, useMemo } from 'react'
import { ButtonLink } from '../components/ButtonLink'
import { fetchWithAuthorization } from '../fetch'
import { GradeHorarios } from '../grade-horarios/GradeHorarios'
import { TurmaMatriculada } from '../grade-horarios/model'
import { OnlyOnlineFeature } from '../online-status/OnlyOnlineFeature'
import { POLLING_TIME_IN_MS } from '../registrar-pedido-matricula/model'
import { convertTurmasMatriculadasToHorariosSelecionados } from '../registrar-pedido-matricula/util'
import { EDITAR_PEDIDO_MATRICULA_ROUTE } from '../routes/routes'
import { StatusPedidoMatricula } from './StatusPedidoMatricula'

export function PedidoMatriculaView() {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<TurmaMatriculada[]>([])

  const horariosSelecionados = useMemo(
    () => convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas, true),
    [turmasMatriculadas]
  )

  const getPedidoMatricula = useCallback(async () => {
    console.debug('[PedidoMatriculaView - Polling] getPedidoMatricula...')
    const response = await fetchWithAuthorization('pedidoMatricula')
    const pedidoMatricula: TurmaMatriculada[] = await response.json()
    setTurmasMatriculadas(pedidoMatricula)
  }, [setTurmasMatriculadas])

  // Ref: https://thewebdev.info/2021/05/29/how-to-poll-an-api-periodically-with-react/
  useEffect(() => {
    const timer = setInterval(getPedidoMatricula, POLLING_TIME_IN_MS)
    return () => clearInterval(timer)
  }, [getPedidoMatricula])

  useEffect(() => {
    getPedidoMatricula()

    window.addEventListener('atualizar', () => {
      console.debug('[PedidoMatriculaView] atualizar event - getPedidoMatricula... ')
      getPedidoMatricula()
    })

    return () => {
      window.removeEventListener('atualizar', () => {
        console.debug('[PedidoMatriculaView] removing listener of atualizar event ')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid style={{ margin: '0.5rem' }} gapVertical={1}>
      <Cell size={12}>
        <Heading level={1}>Pedido de matrícula</Heading>
      </Cell>
      <Cell size={12}>
        <Heading level={2}>Acompanhamento</Heading>
      </Cell>
      <Cell size={12}>
        <StatusPedidoMatricula turmasMatriculadas={turmasMatriculadas} />
      </Cell>
      <OnlyOnlineFeature>
        <Cell size={12}>
          <HFlow justifyContent='flex-end'>
            <ButtonLink path={`/${EDITAR_PEDIDO_MATRICULA_ROUTE}`} kind='primary'>
              Editar
            </ButtonLink>
          </HFlow>
        </Cell>
      </OnlyOnlineFeature>
      <Cell size={12}>
        <Heading level={2}>Grade de horários</Heading>
      </Cell>
      <Cell size={12}>
        <GradeHorarios horariosSelecionados={horariosSelecionados} />
      </Cell>
    </Grid>
  )
}
