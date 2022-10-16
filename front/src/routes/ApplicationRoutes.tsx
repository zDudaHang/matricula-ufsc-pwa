import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarAlunoForm } from '../registrar-aluno/RegistrarAlunoForm'
import { LoginForm } from '../login/LoginForm'
import { EDITAR_PEDIDO_MATRICULA_ROUTE, LOGIN_ROUTE, PEDIDO_MATRICULA_ROUTE, REGISTAR_ALUNO_ROUTE } from './routes'
import { PrivateRoute } from './PrivateRoute'
import { RegistrarPedidoMatriculaForm } from '../registrar-pedido-matricula/RegistrarPedidoMatriculaForm'
import { useState } from 'react'
import { TurmaMatriculada } from '../grade-horarios/model'
import { convertTurmasMatriculadasToHorariosSelecionados } from '../registrar-pedido-matricula/util'
import { OnlyOnlineFeature } from '../online-status/OnlyOnlineFeature'
import { PedidoMatriculaView } from '../pedido-matricula/PedidoMatriculaView'

export function ApplicationRoutes() {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<TurmaMatriculada[]>([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<LoginForm />}>
          <Route path=':nomeUsuario' element={<LoginForm />} />
        </Route>
        <Route path={REGISTAR_ALUNO_ROUTE} element={<RegistrarAlunoForm />} />
        <Route
          path={PEDIDO_MATRICULA_ROUTE}
          element={
            <PrivateRoute>
              <PedidoMatriculaView
                horariosSelecionados={convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas)}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={EDITAR_PEDIDO_MATRICULA_ROUTE}
          element={
            <PrivateRoute>
              <OnlyOnlineFeature>
                <RegistrarPedidoMatriculaForm
                  turmasMatriculadas={turmasMatriculadas}
                  setTurmasMatriculadas={setTurmasMatriculadas}
                />
              </OnlyOnlineFeature>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
