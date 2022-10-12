import { Button, Cell, Grid, Heading, HFlow, VFlow } from 'bold-ui'
import { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import { useEffect, useMemo } from 'react'
import { Form, FormRenderProps } from 'react-final-form'
import { ErrorField } from '../components/fields/ErrorField'
import {
  fetchWithAuthorization,
  HTTP_STATUS_OK,
  HTTP_STATUS_VALIDATION_EXCEPTION,
  ServerValidationError,
} from '../fetch'
import { Turma } from '../generated/graphql'
import { OnlyOnlineFeature } from '../online-status/OnlyOnlineFeature'
import { calculator } from './calculator'
import { GradeHorarios, HorariosSelecionados } from './components/grade-horarios/GradeHorarios'
import { SelectTurmaField, SelectTurmaFieldModel } from './components/select-turma-field/SelectTurmaField'
import { HORARIOS_FIELD_NAME, TURMAS_FIELD_NAME } from './model'
import { buscarPedidoMatricula, convertTurmasMatriculadasToHorariosSelecionados } from './util'

export interface RegistrarPedidoMatriculaFormModel {
  turmas: SelectTurmaFieldModel[]
  horarios: HorariosSelecionados
  hasConflito: boolean
}

interface RegistrarPedidoMatriculaFormProps {
  turmasMatriculadas: Turma[]
  setTurmasMatriculadas(turmas: Turma[]): void
}

export function RegistrarPedidoMatriculaForm(props: RegistrarPedidoMatriculaFormProps) {
  const { turmasMatriculadas, setTurmasMatriculadas } = props

  useEffect(() => {
    buscarPedidoMatricula(setTurmasMatriculadas)
  }, [setTurmasMatriculadas])

  const handleSubmit = async (values: RegistrarPedidoMatriculaFormModel) => {
    const response = await fetchWithAuthorization('registrarPedidoMatricula', {
      method: 'POST',
      body: JSON.stringify({ turmas: values.turmas.map((turma) => turma.codigo) }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === HTTP_STATUS_OK) buscarPedidoMatricula(setTurmasMatriculadas)
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
        turmas: turmasMatriculadas,
        horarios: convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas),
      }}
      decorators={[decorator]}
    />
  )
}
