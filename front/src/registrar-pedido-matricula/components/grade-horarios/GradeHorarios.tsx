import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text, useTheme, VFlow } from 'bold-ui'
import { useField } from 'react-final-form'
import { useBuscarGradeHorariosQuery } from '../../../generated/graphql'
import { HORARIOS_FIELD_NAME } from '../../model'

export type HorariosSelecionados = Map<number, Map<number, TurmaGradeHorarioModel[]>>

export interface TurmaGradeHorarioModel {
  codigoTurma: string
  codigoDisciplina: string
  sala: string
}

// TODO: Deixar esse componente visivel sem internet -> Cenarios: o usuario jah ter logado e nao ter logado
export function GradeHorarios() {
  const { data } = useBuscarGradeHorariosQuery()
  const theme = useTheme()

  const { input: horariosSelecionados } = useField<HorariosSelecionados>(HORARIOS_FIELD_NAME, {
    subscription: { value: true },
  })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader key='vazia' />
          {data?.diasSemana.map((diasSemana) => (
            <TableHeader key={`th-${diasSemana.id}`}>{diasSemana.nome}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.horarios.map(({ horario, id: horarioId }) => (
          <TableRow key={`tr-horario-${horarioId}`}>
            <TableCell
              key={horarioId}
              colSpan={1}
              style={{ borderRight: `1px solid ${theme.pallete.gray.c80}`, textAlign: 'center' }}
            >
              {horario}
            </TableCell>
            {data?.diasSemana.map(({ id: diaSemanaId }) => {
              const turmas = horariosSelecionados.value.get(horarioId)?.get(diaSemanaId)
              if (turmas) {
                const color = turmas.length > 1 ? theme.pallete.status.danger.c40 : theme.pallete.text.main
                return (
                  <TableCell key={`td-${horarioId}-${diaSemanaId}`}>
                    <VFlow vSpacing={0}>
                      {turmas.map((turma) => (
                        <Text key={`turma-${turma.codigoTurma}-${horarioId}-${diaSemanaId}`} style={{ color }}>
                          {turma.codigoTurma} - {turma.sala}
                        </Text>
                      ))}
                    </VFlow>
                  </TableCell>
                )
              } else {
                return <TableCell key={`td-${horarioId}-${diaSemanaId}`} />
              }
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
