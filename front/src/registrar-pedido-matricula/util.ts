import { fetchWithAuthorization } from '../fetch'
import { Turma } from '../generated/graphql'
import { HorariosSelecionados, TurmaGradeHorarioModel } from './components/grade-horarios/GradeHorarios'
import { convertTurmaControllerModelToTurma } from './converter'
import { TurmaControllerModel } from './model'

export function buscarPedidoMatricula(setTurmasMatriculadas: (turmas: Turma[]) => void) {
  fetchWithAuthorization('pedidoMatricula').then((response) =>
    response
      .json()
      .then((turmas: TurmaControllerModel[]) => setTurmasMatriculadas(turmas.map(convertTurmaControllerModelToTurma)))
  )
}

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
