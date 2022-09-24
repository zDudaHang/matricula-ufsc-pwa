import { Calculation } from 'final-form-calculate'
import { TurmaGradeHorarioModel } from './components/grade-horarios/GradeHorarios'
import { SelectTurmaFieldModel } from './components/select-turma-field/SelectTurmaField'
import { RegistrarPedidoMatriculaFormModel } from './RegistrarPedidoMatriculaForm'

export const calculator = (): Calculation => ({
  field: 'turmas',
  updates: {
    horarios: (
      turmasSelecionadas: SelectTurmaFieldModel[],
      { horarios }: RegistrarPedidoMatriculaFormModel,
      { turmas: prevTurmas }: RegistrarPedidoMatriculaFormModel
    ) => {
      let gradeHorarios = horarios
      console.log(turmasSelecionadas)
      turmasSelecionadas?.forEach((turma) => {
        turma.horarios?.forEach(({ horario: { id: horarioId }, diaSemana: { id: diaSemanaId }, sala }) => {
          if (!horarios.has(horarioId)) gradeHorarios.set(horarioId, new Map<number, TurmaGradeHorarioModel[]>())
          if (!horarios.get(horarioId).has(diaSemanaId)) gradeHorarios.get(horarioId).set(diaSemanaId, [])

          if (
            !horarios
              .get(horarioId)
              .get(diaSemanaId)
              .find((t) => t.codigoTurma === turma.codigo)
          ) {
            gradeHorarios.get(horarioId).get(diaSemanaId).push({
              codigoDisciplina: turma.disciplina.codigo,
              codigoTurma: turma.codigo,
              sala,
            })
          }
        })

        const turmasRemovidas = prevTurmas?.filter((prev) => !turmasSelecionadas.includes(prev))
        console.log(turmasRemovidas)
        turmasRemovidas?.forEach((turma) => {
          turma.horarios?.forEach(({ horario: { id: horarioId }, diaSemana: { id: diaSemanaId } }) => {
            gradeHorarios.get(horarioId).set(
              diaSemanaId,
              gradeHorarios
                .get(horarioId)
                .get(diaSemanaId)
                .filter((t) => t.codigoTurma !== turma.codigo)
            )
          })
        })
      })

      return gradeHorarios
    },
  },
})
