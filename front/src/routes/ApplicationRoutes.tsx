import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarAlunoForm } from '../registrar-aluno/RegistrarAlunoForm'
import { LoginForm } from '../login/LoginForm'
import { LOGIN_ROUTE, PEDIDO_MATRICULA_ROUTE, REGISTAR_ALUNO_ROUTE } from './routes'
import { PrivateRoute } from './PrivateRoute'
import { RegistrarPedidoMatriculaForm } from '../registrar-pedido-matricula/RegistrarPedidoMatriculaForm'
import { useState } from 'react'
import { TurmaMatriculada } from '../grade-horarios/model'

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
