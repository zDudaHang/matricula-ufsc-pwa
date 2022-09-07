import { Button, ButtonProps } from 'bold-ui'
import { useNavigate } from 'react-router-dom'

interface ButtonLinkProps extends ButtonProps {
  path: string
}

export function ButtonLink(props: ButtonLinkProps) {
  const { path, ...buttonProps } = props

  const navigate = useNavigate()
  const handleClick = () => navigate(path)

  return <Button {...buttonProps} onClick={handleClick}></Button>
}
