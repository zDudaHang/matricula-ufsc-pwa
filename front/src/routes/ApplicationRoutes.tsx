import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarAlunoForm } from '../registrar/RegistrarAlunoForm'
import { LoginForm } from '../login/LoginForm'
import { LOGIN_ROUTE, REGISTAR_ALUNO_ROUTE } from './routes'

export function ApplicationRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<LoginForm />}>
          <Route path=':nomeUsuario' element={<LoginForm />} />
        </Route>
        <Route path={REGISTAR_ALUNO_ROUTE} element={<RegistrarAlunoForm />} />
      </Routes>
    </BrowserRouter>
  )
}
