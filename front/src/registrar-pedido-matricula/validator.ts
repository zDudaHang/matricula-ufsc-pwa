import { ErrorObject, REQUIRED } from '../validation/model'
import { HorariosSelecionados, TurmaGradeHorarioModel } from './components/grade-horarios/GradeHorarios'
import { RegistrarPedidoMatriculaFormModel } from './RegistrarPedidoMatriculaForm'

export function validateRegistroMatricula(
  values: RegistrarPedidoMatriculaFormModel
): ErrorObject<RegistrarPedidoMatriculaFormModel> {
  let errors: ErrorObject<RegistrarPedidoMatriculaFormModel> = {}
  console.log(values)
  if (!values.turmas || values.turmas.length === 0) {
    errors.turmas = REQUIRED
  }
  //   if (values.horarios) {
  //     console.log(values.horarios)
  //     errors = validateHorarios(errors, values.horarios)
  //   }
  return errors
}

function validateHorarios(
  errors: ErrorObject<RegistrarPedidoMatriculaFormModel>,
  horarios: HorariosSelecionados
): ErrorObject<RegistrarPedidoMatriculaFormModel> {
  debugger
  const iterator = horarios.values()
  let horario: Map<number, TurmaGradeHorarioModel[]> = iterator.next().value
  while (horario) {
    const horarioIterator = horario.values()
    let horarioSelecionado: TurmaGradeHorarioModel[] = horarioIterator.next().value
    while (horarioSelecionado) {
      debugger
      if (horarioSelecionado.length > 1) {
        console.log(horarioSelecionado)
        errors.horarios = 'Conflito encontrado'
        return errors
      }
      horarioSelecionado = horarioIterator.next().value
    }

    horario = iterator.next().value
  }

  return errors
}
