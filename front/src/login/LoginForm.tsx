import { Button, Cell, Grid, Heading, HFlow } from 'bold-ui'
import { Form, FormRenderProps } from 'react-final-form'
import { useParams } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink'
import { PasswordField } from '../components/fields/PasswordField'
import { TextField } from '../components/fields/TextField'
import { LoginInput, useLoginMutation } from '../generated/graphql'
import { JWT_LOCAL_STORAGE } from '../local-storage/model'
import { REGISTAR_ALUNO_ROUTE } from '../routes/routes'

type LoginFormModel = LoginInput

interface LoginURLParams {
  nomeUsuario: string
}

export function LoginForm() {
  const [efetuarLogin] = useLoginMutation({
    // TODO: Utilizar os cookies depois para deixar mais robusto
    onCompleted: (data) => {
      if (data.login.accessToken) localStorage.setItem(JWT_LOCAL_STORAGE, data.login.accessToken)
    },
    onError: (error) => console.log(error),
  })

  const { nomeUsuario } = useParams<keyof LoginURLParams>()

  const handleSubmit = (values: LoginFormModel) => efetuarLogin({ variables: { input: values } })

  const renderForm = (formProps: FormRenderProps<LoginFormModel>) => {
    return (
      <Grid justifyContent='center' alignItems='center'>
        <Cell size={6}>
          <Heading level={1}>Login</Heading>
        </Cell>
        <Cell size={6}>
          <TextField name='nomeUsuario' label='Usuário' placeholder='Digite o seu usuário' required />
        </Cell>
        <Cell size={6}>
          <PasswordField label='Senha' name='senha' placeholder='Digite sua senha' required />
        </Cell>
        <Cell size={6}>
          <HFlow>
            <ButtonLink size='large' path={REGISTAR_ALUNO_ROUTE}>
              Registrar-se
            </ButtonLink>
            <Button type='submit' kind='primary' onClick={formProps.handleSubmit} size='large'>
              Entrar
            </Button>
          </HFlow>
        </Cell>
      </Grid>
    )
  }

  return <Form<LoginFormModel> initialValues={{ nomeUsuario }} render={renderForm} onSubmit={handleSubmit} />
}
