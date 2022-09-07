import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrarAlunoForm } from './registrar/RegistrarAlunoForm'
import { LoginForm } from './login/LoginForm'

export function AppRootView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='registrarAluno' element={<RegistrarAlunoForm />} />
      </Routes>
    </BrowserRouter>
  )
}
