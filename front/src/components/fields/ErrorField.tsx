import { Alert } from 'bold-ui'
import { useField } from 'react-final-form'

interface ErrorFieldProps {
  name: string
}

export function ErrorField(props: ErrorFieldProps) {
  const { name } = props

  const {
    meta: { error },
  } = useField(name, {
    subscription: { error: true },
  })

  return (
    error && (
      <Alert inline type='danger'>
        {error}
      </Alert>
    )
  )
}
