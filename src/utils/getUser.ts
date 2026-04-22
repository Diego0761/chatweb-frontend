import { jwtDecode } from 'jwt-decode'
import type { TUser } from '../types'

export function getUser(): TUser | null {
  const token = localStorage.getItem('token')
  if (!token) return null
  return jwtDecode<TUser>(token)
}
