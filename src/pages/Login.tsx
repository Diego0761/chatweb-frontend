import { useEffect, useState } from 'react'
import api from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

type AuthResponse = {
  token: string
}

type AuthError = {
  error: string
}

export function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigate('/chat')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await api.post<AuthResponse>('/auth/login', {
        login,
        password
      })
      const token = await res.data.token
      localStorage.setItem('token', token)
      navigate('/chat')
    } catch (err) {
      if (axios.isAxiosError<AuthError>(err)) {
        setError(err.response?.data?.error || err.message || 'Erro ao fazer login')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-white text-2xl font-bold">Login</h1>

        <input
          type="text"
          placeholder="Username or Email"
          value={login}
          onChange={e => setLogin(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm text-center">
          Doesn't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
