import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarAlunoForm } from '../registrar-aluno/RegistrarAlunoForm'
import { LoginForm } from '../login/LoginForm'
import { EDITAR_PEDIDO_MATRICULA_ROUTE, LOGIN_ROUTE, PEDIDO_MATRICULA_ROUTE, REGISTAR_ALUNO_ROUTE } from './routes'
import { PrivateRoute } from './PrivateRoute'
import { useEffect, useState } from 'react'
import { DiaSemana, Horario } from '../grade-horarios/model'
import { OnlyOnlineFeature } from '../online-status/OnlyOnlineFeature'
import { PedidoMatriculaView } from '../pedido-matricula/PedidoMatriculaView'
import { fetchWithAuthorization } from '../fetch'
import { RegistrarPedidoMatriculaView } from '../registrar-pedido-matricula/RegistrarPedidoMatriculaView'
import { NotFound } from './NotFound'

export function ApplicationRoutes() {
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [diasSemana, setDiasSemana] = useState<DiaSemana[]>([])

  useEffect(() => {
    fetchWithAuthorization('horarios').then((response) =>
      response.json().then((horarios: Horario[]) => setHorarios(horarios))
    )
    fetchWithAuthorization('diasSemana').then((response) =>
      response.json().then((diasSemana: DiaSemana[]) => setDiasSemana(diasSemana))
    )
  }, [])

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
              <PedidoMatriculaView horarios={horarios} diasSemana={diasSemana} />
            </PrivateRoute>
          }
        />
        <Route
          path={EDITAR_PEDIDO_MATRICULA_ROUTE}
          element={
            <PrivateRoute>
              <OnlyOnlineFeature>
                <RegistrarPedidoMatriculaView horarios={horarios} diasSemana={diasSemana} />
              </OnlyOnlineFeature>
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
