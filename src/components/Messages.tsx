import { useEffect, useRef } from 'react'
import { getUser } from '../utils/getUser'
import type { TMessages } from '../types'

export function Messages({ messages, isConnected }: TMessages) {
  const currentUser = getUser()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isConnected) {
    return (
      <div className="p-4 text-center text-xl text-gray-400">
        Not connected. Please connect to the server to see messages.
      </div>
    )
  }

  return (
    <ul className="list-none m-0 p-0">
      {messages.map((msg, i) => (
        <li key={i} className={`px-4 py-2 ${i % 2 === 0 ? '' : ''} text-xl `}>
          <span className="text-[14px] text-gray-300">
            {new Date(msg.createdAt).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            })}{' '}
          </span>
          <span
            className={`text-xl ${msg.user.id === currentUser?.id ? 'text-blue-500' : 'text-gray-400'}`}
          >
            {msg.user.username}:
          </span>{' '}
          {msg.content}
        </li>
      ))}
      <div ref={bottomRef} />
    </ul>
  )
}
