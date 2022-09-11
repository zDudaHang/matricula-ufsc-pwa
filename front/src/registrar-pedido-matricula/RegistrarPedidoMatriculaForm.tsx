import { Cell, Grid } from 'bold-ui'
import { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import { Form, FormRenderProps } from 'react-final-form'
import { calculator } from './calculator'
import { GradeHorarios, HorariosSelecionados } from './components/grade-horarios/GradeHorarios'
import { SelectTurmaField, SelectTurmaFieldModel } from './components/select-turma-field/SelectTurmaField'

export interface RegistrarPedidoMatriculaFormModel {
  turmas: SelectTurmaFieldModel[]
  horarios: HorariosSelecionados
}

export function RegistrarPedidoMatriculaForm() {
  const renderForm = (formProps: FormRenderProps<RegistrarPedidoMatriculaFormModel>) => {
    return (
      <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <Cell size={12}>
          <SelectTurmaField name='turmas' />
        </Cell>
        <Cell size={12}>
          <GradeHorarios nameTurmaField='turmas' />
        </Cell>
      </Grid>
    )
  }

  const decorators = [
    createDecorator(calculator()) as Decorator<
      RegistrarPedidoMatriculaFormModel,
      Partial<RegistrarPedidoMatriculaFormModel>
    >,
  ]

  return (
    <Form<RegistrarPedidoMatriculaFormModel>
      render={renderForm}
      onSubmit={console.log}
      initialValues={{ turmas: [], horarios: new Map() }}
      decorators={decorators}
    />
  )
}
