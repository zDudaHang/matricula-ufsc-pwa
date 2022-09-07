import { TextField, TextFieldProps } from 'bold-ui'
import { useState } from 'react'
import { useField } from 'react-final-form'

interface PasswordFieldProps extends Pick<TextFieldProps, 'label' | 'placeholder' | 'required'> {
  name: string
}

export function PasswordField(props: PasswordFieldProps) {
  const { input, meta } = useField(props.name)
  const [mustHideText, setMustHideText] = useState<boolean>(true)

  return (
    <TextField
      {...props}
      error={meta.error}
      type={mustHideText ? 'password' : 'text'}
      value={input.value}
      onChange={input.onChange}
      icon={mustHideText ? 'eyeHiddenFilled' : 'eyeFilled'}
      onIconClick={() => setMustHideText(!mustHideText)}
      clearable={false}
    />
  )
}
