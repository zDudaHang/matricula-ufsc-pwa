import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useTheme } from 'bold-ui'
import { useBuscarGradeHorariosQuery } from '../../../generated/graphql'

export function GradeHorarios() {
  const { data } = useBuscarGradeHorariosQuery()
  const theme = useTheme()

  return (
    <Table hovered>
      <TableHead>
        <TableHeader key='vazia' />
        {data?.diasSemana.map((diasSemana) => (
          <TableHeader key={diasSemana.id}>{diasSemana.nome}</TableHeader>
        ))}
      </TableHead>
      <TableBody>
        {data?.horarios.map((horario) => (
          <TableRow key='horarios'>
            <TableCell
              key={horario.id}
              colSpan={1}
              style={{ borderRight: `1px solid ${theme.pallete.gray.c80}`, textAlign: 'center' }}
            >
              {horario.horario}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
