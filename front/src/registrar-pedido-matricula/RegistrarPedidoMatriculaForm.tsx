import { Button, Cell, Grid, Heading, HFlow } from 'bold-ui'
import { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import { useEffect, useMemo, useState } from 'react'
import { Form, FormRenderProps } from 'react-final-form'
import { Turma, useRegistrarPedidoMatriculaMutation } from '../generated/graphql'
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

export function RegistrarPedidoMatriculaForm() {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<Turma[]>([])

  useEffect(() => {
    const accessToken = localStorage.getItem(JWT_LOCAL_STORAGE)
    fetch('http://localhost:8080/pedidoMatricula', { headers: { Authorization: `Bearer ${accessToken}` } }).then(
      (response) =>
        response.json().then((turmas: TurmaControllerModel[]) => {
          console.log(turmas)
          setTurmasMatriculadas(turmas.map(convertTurmaControllerModelToTurma))
        })
    )
  }, [])

  const [registrarPedidoMatricula] = useRegistrarPedidoMatriculaMutation()

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

  console.log(turmasMatriculadas)

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
