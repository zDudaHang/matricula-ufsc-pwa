import { HorarioTurma, Turma } from '../generated/graphql'
import { TurmaControllerModel, HorarioTurmaControllerModel } from './model'

export function convertTurmaControllerModelToTurma(turmaMatriculadaController: TurmaControllerModel): Turma {
  return {
    codigo: turmaMatriculadaController.codigo,
    disciplina: turmaMatriculadaController.disciplina,
    nomeProfessor: turmaMatriculadaController.professor.nome,
    vagasOfertadas: turmaMatriculadaController.vagasOfertadas,
    horarios: turmaMatriculadaController.horarios.map(convertHorarioControllerModelToHorarioTurma),
  }
}

function convertHorarioControllerModelToHorarioTurma(
  horarioTurmaController: HorarioTurmaControllerModel
): HorarioTurma {
  const {
    id: { diaSemana, horario, sala },
  } = horarioTurmaController

  return {
    diaSemana: diaSemana,
    horario: horario,
    sala: sala,
  }
}
