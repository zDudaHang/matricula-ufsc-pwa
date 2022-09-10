import { Cell, Grid } from 'bold-ui'
import { Form, FormRenderProps } from 'react-final-form'
import { GradeHorarios } from './components/grade-horarios/GradeHorarios'
import { SelectTurmaField, SelectTurmaFieldModel } from './components/select-turma-field/SelectTurmaField'

interface RegistrarPedidoMatriculaFormModel {
  turmas: SelectTurmaFieldModel[]
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

  return (
    <Form<RegistrarPedidoMatriculaFormModel>
      render={renderForm}
      onSubmit={console.log}
      initialValues={{ turmas: [] }}
    />
  )
}
