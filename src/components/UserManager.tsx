import { useUser } from "../hooks/useUser";

export function UserManager() {
  const user = useUser()  

  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className="flex gap-4 items-center">
      <p className="text-xl">Hello, {user?.username}!</p>
      <button onClick={logout} className="px-4 py-2 bg-transparent ring-red-500 ring-2 text-xl text-white rounded hover:bg-red-500 cursor-pointer">Log Out</button>
    </div>
  )
}