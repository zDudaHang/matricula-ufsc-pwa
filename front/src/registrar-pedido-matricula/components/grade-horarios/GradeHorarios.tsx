import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useTheme } from 'bold-ui'
import { useField } from 'react-final-form'
import { HorarioAula, useBuscarGradeHorariosQuery } from '../../../generated/graphql'
import { SelectTurmaFieldModel } from '../select-turma-field/SelectTurmaField'
import { partition } from 'lodash'

interface GradeHorariosProps {
  nameTurmaField: string
}

const isDentroDoHorario = (horario: HorarioAula, turma: SelectTurmaFieldModel): boolean =>
  turma.horarios.some(
    (horarioTurma) => horario.id === horarioTurma.horarioInicio.id || horario.id === horarioTurma.horarioFinal.id
  )

export function GradeHorarios(props: GradeHorariosProps) {
  const { data } = useBuscarGradeHorariosQuery()
  const theme = useTheme()

  const { input } = useField(props.nameTurmaField, { subscription: { value: true } })

  const turmasSelecionadas = input.value as SelectTurmaFieldModel[]

  let turmas: SelectTurmaFieldModel[] = []

  let horarios = []

  data?.horarios.forEach((horario) => {
    // turmas = turmasSelecionadas.filter((turma) => {
    //   isDentroDoHorario(horario, turma)
    // })
    turmasSelecionadas.forEach((turma) => {
      const teste = turma.horarios.find(
        (horarioTurma) => horario.id === horarioTurma.horarioInicio.id || horario.id === horarioTurma.horarioFinal.id
      )
      if (teste !== undefined) horarios.push({ horario: teste, codigoDisciplina: turma.disciplina.codigo })
    })
    console.log(horario.id, horarios)
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
        {data?.horarios.map((horario) => (
          <TableRow key={`horarios-${horario.id}`}>
            <TableCell
              key={horario.id}
              colSpan={1}
              style={{ borderRight: `1px solid ${theme.pallete.gray.c80}`, textAlign: 'center' }}
            >
              {horario.horario}
            </TableCell>
            {/* {data?.diasSemana.map((diasSemana) => {
              const turmas = turmasSelecionadas?.filter((turma) =>
                turma.horarios?.filter(
                  (turmaHorario) =>
                    horario.id === turmaHorario.horarioInicio.id && turmaHorario.diaSemana.id === diasSemana.id
                )
              )
              console.log(turmas)
              return <TableCell>Horário encontrado</TableCell>
            })} */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
