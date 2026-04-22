import { useState, useEffect } from 'react'
import api from '../utils/axios'

type User = {
  id: string
  email: string,
  username: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    api.get<User>('/auth/me')
    .then(res => setUser(res.data))
    .catch(() => setUser(null))
  }, [])

  return user
}