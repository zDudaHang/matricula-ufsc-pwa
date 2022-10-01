import { fetchWithAuthorization } from '../fetch'
import { convertTurmaControllerModelToTurma } from './converter'
import { TurmaControllerModel } from './model'

export function buscarPedidoMatricula(setTurmasMatriculadas: Function) {
  fetchWithAuthorization('pedidoMatricula').then((response) =>
    response
      .json()
      .then((turmas: TurmaControllerModel[]) => setTurmasMatriculadas(turmas.map(convertTurmaControllerModelToTurma)))
  )
}
