import { useOnlineStatus } from './useOnlineStatus'

interface OnlyOnlineFeatureProps {
  children: React.ReactNode
}

export function OnlyOnlineFeature(props: OnlyOnlineFeatureProps) {
  const isOnline = useOnlineStatus()
  return isOnline ? <>{props.children}</> : null
}
