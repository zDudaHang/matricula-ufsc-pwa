import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarAlunoForm } from '../registrar/RegistrarAlunoForm'
import { LoginForm } from '../login/LoginForm'
import { HOME_ROUTE, REGISTAR_ALUNO_ROUTE } from './routes'

export function ApplicationRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<LoginForm />} />
        <Route path={REGISTAR_ALUNO_ROUTE} element={<RegistrarAlunoForm />} />
      </Routes>
    </BrowserRouter>
  )
}
