import { useState } from "react"

function Login({ setUser }) {

  const [name,setName] = useState("")

  const handleLogin = ()=>{
    if(!name) return

    localStorage.setItem("user",name)
    setUser(name)
  }

  return(

    <div className="h-screen flex items-center justify-center bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-lg w-[300px] text-center">

        <h2 className="text-white text-2xl mb-6">Login</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full px-4 py-2 rounded mb-4 bg-gray-700 text-white outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Enter
        </button>

      </div>

    </div>

  )
}

export default Login