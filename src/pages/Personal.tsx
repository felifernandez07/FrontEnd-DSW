import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  name: string
  lastname: string
  email: string
  dni: string
}

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetch('http://localhost:3000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        } else {
          setError(data.message || 'No se pudo obtener el perfil')
        }
      })
      .catch(err => {
        console.error(err)
        setError('Error al cargar el perfil')
      })
  }, [navigate])

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>
  }

  if (!user) return <p>Cargando perfil...</p>

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Mi Perfil</h2>
      <p><strong>Nombre:</strong> {user.name} {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>DNI:</strong> {user.dni}</p>
    </div>
  )
}

export default Profile
