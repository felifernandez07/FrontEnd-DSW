import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        toast.error(data.message || 'Error al iniciar sesión')
        return
      }
  
      localStorage.setItem('token', data.token)

      const meRes = await fetch('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
  
      const meData = await meRes.json()
  
      if (!meRes.ok) {
        toast.error('No se pudo obtener el perfil del usuario')
        return
      }
  
      localStorage.setItem('user', JSON.stringify(meData.user))
      localStorage.setItem('clientEmail', meData.user.email)

      toast.success("Inicio de sesión exitoso ✅")

      navigate('/store')
    } catch (err) {
      console.error(err)
      toast.error('Error al conectar con el servidor')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            className='login-input'
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor='password'>Contraseña</label>
          <input
            id='password'
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            className='login-input'
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Entrar
        </button>
      </form>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <span>¿No tenés cuenta?</span>{' '}
        <a href="/register">Registrate acá</a>
      </div>
    </div>
  )
}

export default Login