import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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
        setError(data.message || 'Error al iniciar sesión')
        return
      }
  
      // ✅ Guardar token
      localStorage.setItem('token', data.token)
  
      // ✅ Obtener perfil del usuario con el token
      const meRes = await fetch('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
  
      const meData = await meRes.json()
  
      if (!meRes.ok) {
        setError('No se pudo obtener el perfil del usuario')
        return
      }
  
      // ✅ Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(meData.user))
  
      // ✅ Redirigir
      navigate('/store')
    } catch (err) {
      console.error(err)
      setError('Error al conectar con el servidor')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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