import { Button, Cell, Grid, Heading, HFlow } from 'bold-ui'
import { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import { useEffect, useMemo } from 'react'
import { Form, FormRenderProps } from 'react-final-form'
import { Turma, useRegistrarPedidoMatriculaMutation } from '../generated/graphql'
import { OnlyOnlineFeature } from '../online-status/OnlyOnlineFeature'
import { calculator } from './calculator'
import { GradeHorarios, HorariosSelecionados, TurmaGradeHorarioModel } from './components/grade-horarios/GradeHorarios'
import { SelectTurmaField, SelectTurmaFieldModel } from './components/select-turma-field/SelectTurmaField'
import { buscarPedidoMatricula } from './util'

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
    buscarPedidoMatricula(setTurmasMatriculadas)
  }, [setTurmasMatriculadas])

  const [registrarPedidoMatricula] = useRegistrarPedidoMatriculaMutation({
    onCompleted: () => {
      buscarPedidoMatricula(setTurmasMatriculadas)
    },
  })

  const handleSubmit = (values: RegistrarPedidoMatriculaFormModel) => {
    registrarPedidoMatricula({
      variables: {
        input: {
          codigosTurmas: values.turmas.map((turma) => turma.codigo),
        },
      },
    })
  }

  const renderForm = (formProps: FormRenderProps<RegistrarPedidoMatriculaFormModel>) => {
    return (
      <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <Cell size={12}>
          <Heading level={1}>Pedido de matrícula</Heading>
        </Cell>
        <OnlyOnlineFeature>
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
        </OnlyOnlineFeature>
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
