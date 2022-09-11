import { Calculation } from 'final-form-calculate'
import { TurmaGradeHorarioModel } from './components/grade-horarios/GradeHorarios'
import { SelectTurmaFieldModel } from './components/select-turma-field/SelectTurmaField'
import { RegistrarPedidoMatriculaFormModel } from './RegistrarPedidoMatriculaForm'

export const calculator = (): Calculation => ({
  field: 'turmas',
  updates: {
    horarios: (turmasSelecionadas: SelectTurmaFieldModel[], { horarios }: RegistrarPedidoMatriculaFormModel) => {
      turmasSelecionadas.forEach((turma) => {
        turma.horarios.forEach(({ horario: { id: horarioId }, diaSemana: { id: diaSemanaId }, sala }) => {
          if (!horarios.has(horarioId)) horarios.set(horarioId, new Map<number, TurmaGradeHorarioModel[]>())
          if (!horarios.get(horarioId).has(diaSemanaId)) horarios.get(horarioId).set(diaSemanaId, [])

          if (
            !horarios
              .get(horarioId)
              .get(diaSemanaId)
              .find((t) => t.codigoTurma === turma.codigo)
          )
            horarios.get(horarioId).get(diaSemanaId).push({
              codigoDisciplina: turma.disciplina.codigo,
              codigoTurma: turma.codigo,
              sala,
            })
        })
      })
      return horarios
    },
  },
})
