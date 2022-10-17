import { TableCell, VFlow, Text, useTheme } from 'bold-ui'
import { TurmaGradeHorarioModel } from './model'

interface TurmasRowProps {
  turmas: TurmaGradeHorarioModel[]
  horarioId: number
  diaSemanaId: number
}

export function TurmasRow(props: TurmasRowProps) {
  const { turmas, diaSemanaId, horarioId } = props

  const theme = useTheme()

  if (turmas) {
    const color = turmas.length > 1 ? theme.pallete.status.danger.c40 : theme.pallete.text.main
    return (
      <TableCell>
        <VFlow vSpacing={0}>
          {turmas.map((turma) => (
            <Text key={`turma-${turma.codigoTurma}-${horarioId}-${diaSemanaId}`} style={{ color }}>
              {turma.codigoTurma} - {turma.sala}{' '}
              {turma.posicao && `(posição: ${turma.posicao} de ${turma.vagasOfertadas})`}
            </Text>
          ))}
        </VFlow>
      </TableCell>
    )
  } else {
    return <TableCell />
  }
}
