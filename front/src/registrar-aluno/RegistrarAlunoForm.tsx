import { Grid, Cell, Heading, Button } from 'bold-ui'
import { FormRenderProps } from 'react-final-form'
import { useNavigate } from 'react-router-dom'
import { NumberField } from '../components/fields/NumberField'
import { PasswordField } from '../components/fields/PasswordField'
import { TextField } from '../components/fields/TextField'
import { Form } from '../components/Form'
import { fetchPostWithJsonBodyAndWithoutAuthorization } from '../fetch'
import { LOGIN_ROUTE } from '../routes/routes'
import { RegistrarAlunoInput, RegistrarAlunoResult } from './model'

type RegistrarAlunoFormModel = RegistrarAlunoInput

export function RegistrarAlunoForm() {
  const navigate = useNavigate()

  const handleSubmit = (values: RegistrarAlunoFormModel) =>
    fetchPostWithJsonBodyAndWithoutAuthorization('registrarAluno', values)

  const handleSubmiSuccess = (result: RegistrarAlunoResult) => navigate(`/${LOGIN_ROUTE}/${result.nomeUsuario}`)

  const renderForm = (formProps: FormRenderProps<RegistrarAlunoFormModel>) => {
    return (
      <Grid justifyContent='center' alignItems='center'>
        <Cell size={10}>
          <Heading level={1}>Registrando um aluno</Heading>
        </Cell>
        <Cell size={5}>
          <TextField name='nome' label='Nome' placeholder='Digite o seu nome' required />
        </Cell>
        <Cell size={5}>
          <TextField name='nomeUsuario' label='Usuário' placeholder='Digite o seu usuário' required />
        </Cell>
        <Cell size={8}>
          <PasswordField label='Senha' name='senha' placeholder='Digite sua senha' required />
        </Cell>
        <Cell size={2}>
          <NumberField name='iaa' label='IAA' placeholder='Digite um valor para o IAA' required max={10} min={0} />
        </Cell>
        <Cell size={10}>
          <Button type='submit' kind='primary' onClick={formProps.handleSubmit} size='large'>
            Registrar
          </Button>
        </Cell>
      </Grid>
    )
  }

  return (
    <Form<RegistrarAlunoFormModel> render={renderForm} onSubmit={handleSubmit} onSubmitSucceeded={handleSubmiSuccess} />
  )
}
