import { Button, Cell, Grid, Heading, HFlow, VFlow } from 'bold-ui'
import { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import { useCallback, useEffect, useMemo } from 'react'
import { Form, FormRenderProps } from 'react-final-form'
import { ErrorField } from '../components/fields/ErrorField'
import {
  fetchWithAuthorization,
  HTTP_STATUS_OK,
  HTTP_STATUS_VALIDATION_EXCEPTION,
  ServerValidationError,
} from '../fetch'
import { OnlyOnlineFeature } from '../online-status/OnlyOnlineFeature'
import { calculator } from './calculator'
import { GradeHorarios } from '../grade-horarios/GradeHorarios'
import { SelectTurmaField, SelectTurmaFieldModel } from './components/select-turma-field/SelectTurmaField'
import { HORARIOS_FIELD_NAME, POLLING_TIME_IN_MS, TURMAS_FIELD_NAME } from './model'
import { convertTurmasMatriculadasToHorariosSelecionados } from './util'
import { HorariosSelecionados, TurmaMatriculada } from '../grade-horarios/model'

export interface RegistrarPedidoMatriculaFormModel {
  turmas: SelectTurmaFieldModel[]
  horarios: HorariosSelecionados
  hasConflito: boolean
}

interface RegistrarPedidoMatriculaFormProps {
  turmasMatriculadas: TurmaMatriculada[]
  setTurmasMatriculadas(turmas: TurmaMatriculada[]): void
}

export function RegistrarPedidoMatriculaForm(props: RegistrarPedidoMatriculaFormProps) {
  const { turmasMatriculadas, setTurmasMatriculadas } = props

  const getPedidoMatricula = useCallback(async () => {
    console.debug('[RegistrarPedidoMatriculaForm.tsx] getPedidoMatricula...')
    const response = await fetchWithAuthorization('pedidoMatricula')
    const pedidoMatricula: TurmaMatriculada[] = await response.json()
    console.log(pedidoMatricula)
    setTurmasMatriculadas(pedidoMatricula)
  }, [setTurmasMatriculadas])

  // Ref: https://thewebdev.info/2021/05/29/how-to-poll-an-api-periodically-with-react/
  useEffect(() => {
    const timer = setInterval(getPedidoMatricula, POLLING_TIME_IN_MS)
    return () => clearInterval(timer)
  }, [getPedidoMatricula])

  useEffect(() => {
    getPedidoMatricula()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (values: RegistrarPedidoMatriculaFormModel) => {
    const response = await fetchWithAuthorization('registrarPedidoMatricula', {
      method: 'POST',
      body: JSON.stringify({ turmas: values.turmas.map((turma) => turma.codigo) }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === HTTP_STATUS_OK) getPedidoMatricula()
    if (response.status === HTTP_STATUS_VALIDATION_EXCEPTION) {
      const errors: ServerValidationError<RegistrarPedidoMatriculaFormModel> = await response.json()
      return { ...errors.errors }
    }
  }

  const renderForm = (formProps: FormRenderProps<RegistrarPedidoMatriculaFormModel>) => {
    const { handleSubmit } = formProps
    return (
      <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <Cell size={12}>
          <Heading level={1}>Pedido de matrícula</Heading>
          <ErrorField name={HORARIOS_FIELD_NAME} />
        </Cell>
        <OnlyOnlineFeature>
          <Cell size={12}>
            <SelectTurmaField name={TURMAS_FIELD_NAME} />
          </Cell>
          <Cell size={12}>
            <HFlow justifyContent='flex-end'>
              <Button type='submit' kind='primary' onClick={handleSubmit}>
                Registrar
              </Button>
            </HFlow>
          </Cell>
        </OnlyOnlineFeature>
        <Cell size={12}>
          <VFlow>
            <GradeHorarios />
          </VFlow>
        </Cell>
      </Grid>
    )
  }

  const decorator = useMemo(
    () =>
      createDecorator(calculator()) as Decorator<
        RegistrarPedidoMatriculaFormModel,
        Partial<RegistrarPedidoMatriculaFormModel>
      >,
    []
  )

  return (
    <Form<RegistrarPedidoMatriculaFormModel>
      render={renderForm}
      onSubmit={handleSubmit}
      initialValues={{
        turmas: turmasMatriculadas.map((turmaMatriculada) => turmaMatriculada.turma),
        horarios: convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas),
      }}
      decorators={[decorator]}
    />
  )
}
