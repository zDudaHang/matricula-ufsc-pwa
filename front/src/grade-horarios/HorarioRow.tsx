import { TableRow, TableCell, useTheme } from 'bold-ui'
import { DiaSemana, Horario, HorariosSelecionados } from './model'
import { TurmasRow } from './TurmasRow'

interface HorarioRowProps {
  horario: Horario
  diasSemana: DiaSemana[]
  horariosSelecionados: HorariosSelecionados
}

export function HorarioRow(props: HorarioRowProps) {
  const {
    horario: { id: horarioId, horario },
    diasSemana,
    horariosSelecionados,
  } = props

  const theme = useTheme()

  return (
    <TableRow>
      <TableCell
        key={horarioId}
        colSpan={1}
        style={{ borderRight: `1px solid ${theme.pallete.gray.c80}`, textAlign: 'center' }}
      >
        {horario}
      </TableCell>

      {diasSemana.map(({ id: diaSemanaId }) => (
        <TurmasRow
          key={`td-${horarioId}-${diaSemanaId}`}
          turmas={horariosSelecionados?.get(horarioId)?.get(diaSemanaId)}
          horarioId={horarioId}
          diaSemanaId={diaSemanaId}
        />
      ))}
    </TableRow>
  )
}
