import { Button, Cell, Grid, Heading, HFlow } from 'bold-ui'
import { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import { useEffect, useMemo } from 'react'
import { Form, FormRenderProps } from 'react-final-form'
import { Turma } from '../generated/graphql'
import { JWT_LOCAL_STORAGE } from '../local-storage/model'
import { calculator } from './calculator'
import { GradeHorarios, HorariosSelecionados, TurmaGradeHorarioModel } from './components/grade-horarios/GradeHorarios'
import { SelectTurmaField, SelectTurmaFieldModel } from './components/select-turma-field/SelectTurmaField'
import { convertTurmaControllerModelToTurma } from './converter'
import { TurmaControllerModel } from './model'

export interface RegistrarPedidoMatriculaFormModel {
  turmas: SelectTurmaFieldModel[]
  horarios: HorariosSelecionados
}

interface RegistrarPedidoMatriculaFormProps {
  turmasMatriculadas: Turma[]
  setTurmasMatriculadas(turmas: Turma[]): void
}

export function RegistrarPedidoMatriculaForm(props: RegistrarPedidoMatriculaFormProps) {
  const { turmasMatriculadas, setTurmasMatriculadas } = props

  useEffect(() => {
    const accessToken = localStorage.getItem(JWT_LOCAL_STORAGE)
    fetch('http://localhost:8080/pedidoMatricula', { headers: { Authorization: `Bearer ${accessToken}` } }).then(
      (response) =>
        response
          .json()
          .then((turmas: TurmaControllerModel[]) =>
            setTurmasMatriculadas(turmas.map(convertTurmaControllerModelToTurma))
          )
    )
  }, [setTurmasMatriculadas])

  const handleSubmit = (values: RegistrarPedidoMatriculaFormModel) => {
    const accessToken = localStorage.getItem(JWT_LOCAL_STORAGE)
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values.turmas.map((turma) => turma.codigo)),
    }
    fetch('http://localhost:8080/registrarPedidoMatricula', options).then((response) =>
      response
        .json()
        .then((turmas: TurmaControllerModel[]) => setTurmasMatriculadas(turmas.map(convertTurmaControllerModelToTurma)))
    )
  }

  const renderForm = (formProps: FormRenderProps<RegistrarPedidoMatriculaFormModel>) => {
    return (
      <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <Cell size={12}>
          <Heading level={1}>Pedido de matrícula</Heading>
        </Cell>
        <Cell size={12}>
          <SelectTurmaField name='turmas' />
        </Cell>
        <Cell size={12}>
          <HFlow justifyContent='flex-end'>
            <Button type='submit' kind='primary' onClick={formProps.handleSubmit}>
              Registrar pedido
            </Button>
          </HFlow>
        </Cell>
        <Cell size={12}>
          <GradeHorarios />
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
        horarios: new Map<number, Map<number, TurmaGradeHorarioModel[]>>(),
      }}
      decorators={[decorator]}
    />
  )
}
