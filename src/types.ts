export type TMessages = {
  messages: TMessage[]
  isConnected: boolean
}

export type TUser = {
  id: string
  username: string
  createdAt: Date
}

export type TMessage = {
  content: string
  user: TUser
  createdAt: Date
}

export type TMessageUser = {
  user_id: string
  username: string
  createdAt: Date
}

