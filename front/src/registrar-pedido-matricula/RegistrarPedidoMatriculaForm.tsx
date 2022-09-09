import { Cell, Grid } from 'bold-ui'
import { SelectTurmaField } from './components/SelectTurmaField'

export function RegistrarPedidoMatriculaForm() {
  return (
    <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
      <Cell size={6}>
        <SelectTurmaField />
      </Cell>
    </Grid>
  )
}
