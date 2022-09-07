import { TextField as BoldTextField, TextFieldProps as BoldTextFieldProps } from 'bold-ui'
import { useField } from 'react-final-form'

interface NumberFieldProps extends Pick<BoldTextFieldProps, 'label' | 'placeholder' | 'required' | 'max' | 'min'> {
  name: string
}

export function NumberField(props: NumberFieldProps) {
  const { input, meta } = useField(props.name)

  return (
    <BoldTextField
      {...props}
      error={meta.error}
      type='number'
      value={input.value}
      onChange={input.onChange}
      clearable={false}
    />
  )
}
