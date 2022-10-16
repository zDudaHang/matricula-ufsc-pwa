import { Cell, Grid, Heading } from 'bold-ui'
import { ButtonLink } from '../components/ButtonLink'
import { GradeHorarios, GradeHorariosProps } from '../grade-horarios/GradeHorarios'
import { EDITAR_PEDIDO_MATRICULA_ROUTE } from '../routes/routes'

interface PedidoMatriculaViewProps extends GradeHorariosProps {}

export function PedidoMatriculaView(props: PedidoMatriculaViewProps) {
  return (
    <Grid style={{ margin: '2rem' }}>
      <Cell size={10}>
        <Heading level={1}>Pedido de matrícula</Heading>
      </Cell>
      <Cell size={1}>
        <ButtonLink path={`/${EDITAR_PEDIDO_MATRICULA_ROUTE}`} kind='primary' size='large'>
          Editar
        </ButtonLink>
      </Cell>
      <Cell size={12}>
        <GradeHorarios {...props} />
      </Cell>
    </Grid>
  )
}
