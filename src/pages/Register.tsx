import { useEffect, useState } from 'react'
import api from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { socket } from '../utils/socket'

type AuthResponse = {
  token: string
}

type AuthError = {
  error: string
}

export function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigate('/chat')
  }, [])

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await api.post<AuthResponse>('/auth/register', {
        username,
        email,
        password
      })
      const token = await res.data.token
      localStorage.setItem('token', token)

      socket.auth = { token }
      socket.connect()
      navigate('/chat')
    } catch (err) {
      if (axios.isAxiosError<AuthError>(err)) {
        setError(err.response?.data?.error || 'Erro ao fazer login')
      }
    }

    navigate('/chat')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        className="bg-gray-900 p-8 rounded-xl w-full max-w-sm flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-2xl font-bold">Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  )
}
