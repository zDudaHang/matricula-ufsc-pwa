import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarAlunoForm } from '../registrar-aluno/RegistrarAlunoForm'
import { LoginForm } from '../login/LoginForm'
import { LOGIN_ROUTE, REGISTAR_ALUNO_ROUTE, REGISTRAR_PEDIDO_MATRICULA_ROUTE } from './routes'
import { PrivateRoute } from './PrivateRoute'
import { RegistrarPedidoMatriculaForm } from '../registrar-pedido-matricula/RegistrarPedidoMatriculaForm'
import { useState } from 'react'
import { Turma } from '../generated/graphql'

export function ApplicationRoutes() {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<Turma[]>([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<LoginForm />}>
          <Route path=':nomeUsuario' element={<LoginForm />} />
        </Route>
        <Route path={REGISTAR_ALUNO_ROUTE} element={<RegistrarAlunoForm />} />
        <Route
          path={REGISTRAR_PEDIDO_MATRICULA_ROUTE}
          element={
            <PrivateRoute>
              <RegistrarPedidoMatriculaForm
                turmasMatriculadas={turmasMatriculadas}
                setTurmasMatriculadas={setTurmasMatriculadas}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
