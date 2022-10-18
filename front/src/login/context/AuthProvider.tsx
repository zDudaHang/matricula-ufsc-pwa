import { createContext, useState } from 'react'
import { AUTH_LOCAL_STORAGE } from '../../local-storage/model'

export const AuthContext = createContext<AuthContextModel>(null)

export interface AuthContextModel {
  iaa?: number
  setIaa(iaa: number): void
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
  const iaaLocalStorage = Number(localStorage.getItem(AUTH_LOCAL_STORAGE))

  const [iaa, setIaa] = useState<number>(iaaLocalStorage)

  const handleUpdate = (iaa: number) => {
    localStorage.setItem(AUTH_LOCAL_STORAGE, iaa.toString())
    setIaa(iaa)
  }

  return <AuthContext.Provider value={{ iaa, setIaa: handleUpdate }}>{props.children}</AuthContext.Provider>
}
