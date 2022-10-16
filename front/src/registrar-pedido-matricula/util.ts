import { Turma } from '../generated/graphql'
import { HorariosSelecionados, TurmaGradeHorarioModel } from './components/grade-horarios/GradeHorarios'

export function convertTurmasMatriculadasToHorariosSelecionados(turmas: Turma[]): HorariosSelecionados {
  let horariosSelecionados = new Map<number, Map<number, TurmaGradeHorarioModel[]>>()

  turmas?.forEach((turma) => {
    turma.horarios?.forEach(({ horario: { id: horarioId }, diaSemana: { id: diaSemanaId }, sala }) => {
      if (!horariosSelecionados.has(horarioId))
        horariosSelecionados.set(horarioId, new Map<number, TurmaGradeHorarioModel[]>())
      if (!horariosSelecionados.get(horarioId).has(diaSemanaId))
        horariosSelecionados.get(horarioId).set(diaSemanaId, [])

      if (
        !horariosSelecionados
          .get(horarioId)
          .get(diaSemanaId)
          .find((t) => t.codigoTurma === turma.codigo)
      ) {
        horariosSelecionados.get(horarioId).get(diaSemanaId).push({
          codigoDisciplina: turma.disciplina.codigo,
          codigoTurma: turma.codigo,
          sala,
        })
      }
    })
  })

  return horariosSelecionados
}
