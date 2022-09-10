import { Cell, Grid } from 'bold-ui'
import { GradeHorarios } from './components/grade-horarios/GradeHorarios'
import { SelectTurmaField } from './components/select-turma-field/SelectTurmaField'

export function RegistrarPedidoMatriculaForm() {
  return (
    <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
      <Cell size={12}>
        <SelectTurmaField />
      </Cell>
      <Cell size={12}>
        <GradeHorarios />
      </Cell>
    </Grid>
  )
}
