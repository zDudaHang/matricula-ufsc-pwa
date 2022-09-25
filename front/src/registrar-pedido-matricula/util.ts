import { JWT_LOCAL_STORAGE } from '../local-storage/model'
import { convertTurmaControllerModelToTurma } from './converter'
import { TurmaControllerModel } from './model'

export function buscarPedidoMatricula(setTurmasMatriculadas: Function) {
  const accessToken = localStorage.getItem(JWT_LOCAL_STORAGE)
  fetch('http://localhost:8080/pedidoMatricula', { headers: { Authorization: `Bearer ${accessToken}` } }).then(
    (response) =>
      response
        .json()
        .then((turmas: TurmaControllerModel[]) => setTurmasMatriculadas(turmas.map(convertTurmaControllerModelToTurma)))
  )
}
