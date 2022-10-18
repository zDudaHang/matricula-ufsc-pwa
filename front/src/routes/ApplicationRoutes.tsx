import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarAlunoForm } from '../registrar-aluno/RegistrarAlunoForm'
import { LoginForm } from '../login/LoginForm'
import { EDITAR_PEDIDO_MATRICULA_ROUTE, LOGIN_ROUTE, PEDIDO_MATRICULA_ROUTE, REGISTAR_ALUNO_ROUTE } from './routes'
import { PrivateRoute } from './PrivateRoute'
import { OnlyOnlineFeature } from '../online-status/OnlyOnlineFeature'
import { PedidoMatriculaView } from '../pedido-matricula/PedidoMatriculaView'
import { RegistrarPedidoMatriculaView } from '../registrar-pedido-matricula/RegistrarPedidoMatriculaView'
import { NotFound } from './NotFound'

export function ApplicationRoutes() {
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
              <PedidoMatriculaView />
            </PrivateRoute>
          }
        />
        <Route
          path={EDITAR_PEDIDO_MATRICULA_ROUTE}
          element={
            <PrivateRoute>
              <OnlyOnlineFeature>
                <RegistrarPedidoMatriculaView />
              </OnlyOnlineFeature>
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
