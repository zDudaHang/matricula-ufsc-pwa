import { Button, Cell, Grid, Heading } from 'bold-ui'
import { Form, FormRenderProps } from 'react-final-form'
import { PasswordField } from '../fields/PasswordField'
import { TextField } from '../fields/TextField'
import { LoginInput, useLoginMutation } from '../generated/graphql'

type LoginFormModel = LoginInput

export function LoginForm() {
  const [efetuarLogin] = useLoginMutation({
    onCompleted: (data) => console.log(data),
    onError: (error) => console.log(error),
  })

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
          <Button type='submit' kind='primary' onClick={formProps.handleSubmit}>
            Entrar
          </Button>
        </Cell>
      </Grid>
    )
  }

  return <Form<LoginFormModel> render={renderForm} onSubmit={handleSubmit} />
}
