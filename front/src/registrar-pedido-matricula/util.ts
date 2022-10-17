import { HorariosSelecionados, TurmaGradeHorarioModel, TurmaMatriculada } from '../grade-horarios/model'

export function convertTurmasMatriculadasToHorariosSelecionados(turmas: TurmaMatriculada[]): HorariosSelecionados {
  let horariosSelecionados = new Map<number, Map<number, TurmaGradeHorarioModel[]>>()

  turmas?.forEach(({ turma, posicao }) => {
    turma.horarios?.forEach(
      ({
        id: {
          diaSemana: { id: diaSemanaId },
          horario: { id: horarioId },
          sala,
        },
      }) => {
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
            posicao,
          })
        }
      }
    )
  })

  return horariosSelecionados
}
