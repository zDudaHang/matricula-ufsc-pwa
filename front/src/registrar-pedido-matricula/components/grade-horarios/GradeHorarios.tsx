import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useTheme } from 'bold-ui'
import { useField } from 'react-final-form'
import { useBuscarGradeHorariosQuery } from '../../../generated/graphql'

export type HorariosSelecionados = Map<number, Map<number, TurmaGradeHorarioModel[]>>

export interface TurmaGradeHorarioModel {
  codigoTurma: string
  codigoDisciplina: string
  sala: string
}

interface GradeHorariosProps {
  nameTurmaField: string
}

export function GradeHorarios(props: GradeHorariosProps) {
  const { data } = useBuscarGradeHorariosQuery()
  const theme = useTheme()

  const { input: horariosSelecionados } = useField<HorariosSelecionados>('horarios', {
    subscription: { value: true },
  })

  return (
    <Table hovered>
      <TableHead>
        <TableHeader key='vazia' />
        {data?.diasSemana.map((diasSemana) => (
          <TableHeader key={diasSemana.id}>{diasSemana.nome}</TableHeader>
        ))}
      </TableHead>
      <TableBody>
        {data?.horarios.map(({ horario, id: horarioId }) => (
          <TableRow key={`horarios-${horarioId}`}>
            <TableCell
              key={horarioId}
              colSpan={1}
              style={{ borderRight: `1px solid ${theme.pallete.gray.c80}`, textAlign: 'center' }}
            >
              {horario}
            </TableCell>
            {data?.diasSemana.map(({ id }) => {
              const turmas = horariosSelecionados.value.get(horarioId)?.get(id)
              if (turmas) {
                return turmas?.map((turma) => (
                  <TableCell>
                    {turma.codigoTurma} - {turma.sala}
                  </TableCell>
                ))
              } else {
                return <TableCell />
              }
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
