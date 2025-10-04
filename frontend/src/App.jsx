import React, {useState} from 'react'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'

export default function App(){
  const [user, setUser] = useState(null)
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {!user ? <LoginForm onLogin={u=>setUser(u)} /> : <Dashboard user={user} onLogout={()=>setUser(null)} />}
      </div>
    </div>
  )
}
