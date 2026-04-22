import { useEffect, useState } from 'react'
import { socket } from '../utils/socket'
import { ConnectionManager } from '../components/ConnectionManager'
import { ConnectionState } from '../components/ConnectionState'
import { Messages } from '../components/Messages'
import { Form } from '../components/Form'
import { UserManager } from '../components/UserManager'
import type { TMessage } from '../types'
import { getUser } from '../utils/getUser'
import { useNavigate } from 'react-router-dom'

export function Chat() {
  const [messages, setMessages] = useState<TMessage[]>([])
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [input, setInput] = useState('')
  const currentUser = getUser()
  const navigate = useNavigate()

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setInput('')

      setIsConnected(false)
    }

    function onMessage(msg: TMessage) {
      setMessages(prev => [...prev, msg])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('chat message', (msg: TMessage) => {
      if (!currentUser) return
      if (msg.content.trim() === '') return
      if (msg.content.length > 500) return
      if (msg.user.id === currentUser.id) return

      onMessage(msg)
    })

    return () => {
      socket.off('chat message', onMessage)
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isConnected) return
    if (!currentUser) return
    if (input.trim() === '') return
    if (input.length > 500) return

    setMessages(prev => [
      ...prev,
      {
        content: input,
        createdAt: new Date(),
        user: {
          id: currentUser.id,
          username: currentUser.username,
          createdAt: currentUser.createdAt
        }
      }
    ])

    if (input.trim()) {
      socket.emit('chat message', input)
      setInput('')
    }
  }

  return (
    <div className="font-sans pb-12">
      <div className="my-4 mx-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ConnectionState isConnected={isConnected} />
          <ConnectionManager />
        </div>

        <UserManager />
      </div>

      <Messages messages={messages} isConnected={isConnected} />
      <Form
        input={input}
        setInput={setInput}
        isConnected={isConnected}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
