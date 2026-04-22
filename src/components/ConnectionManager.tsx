import { socket } from '../utils/socket'

export function ConnectionManager() {
  function connect() {
    setTimeout(() => {
      socket.connect()
    }, 300)
  }

  function disconnect() {
    setTimeout(() => {
      socket.disconnect()
    }, 300)
  }

  return (
    <div>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white border-none px-4 py-2 mx-1 rounded cursor-pointer"
        onClick={connect}
      >
        Connect
      </button>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white border-none px-4 py-2 mx-1 rounded cursor-pointer"
        onClick={disconnect}
      >
        Disconnect
      </button>
    </div>
  )
}
