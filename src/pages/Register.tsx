import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ClientFormData = {
  name: string
  lastname: string
  birthdate: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  dni: string
  password: string
  clientClass: string
}

type ClientClass = {
  id: string
  name: string
}

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    lastname: '',
    birthdate: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    dni: '',
    password: '',
    clientClass: ''
  })

  const [clientClasses, setClientClasses] = useState<ClientClass[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchClientClasses = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/client/classes')
        const data = await res.json()
        setClientClasses(data.data)
      } catch (err) {
        console.error('Error al obtener clientClass:', err)
      }
    }

    fetchClientClasses()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Datos enviados al backend:', formData) // 👈 LOG DE CONTROL

    try {
      const res = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Error al registrar cliente')
        return
      }

      alert('¡Registrado con éxito! Ahora podés iniciar sesión.')
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError('Error al conectar con el servidor')
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '50px auto' }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        {([
          ['name', 'Nombre'],
          ['lastname', 'Apellido'],
          ['birthdate', 'Fecha de nacimiento'],
          ['email', 'Email'],
          ['phone', 'Teléfono'],
          ['address', 'Dirección'],
          ['city', 'Ciudad'],
          ['country', 'País'],
          ['postalCode', 'Código Postal'],
          ['dni', 'DNI'],
        ] as [keyof ClientFormData, string][]).map(([name, label]) => (
          <div key={name} style={{ marginBottom: 10 }}>
            <label>{label}</label>
            <input
              type={name === 'birthdate' ? 'date' : 'text'}
              name={name}
              value={formData[name]}
              required
              onChange={handleChange}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
        ))}

        {/* Campo de contraseña (corregido y separado) */}
        <div style={{ marginBottom: 10 }}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        {/* Selector de tipo de cliente */}
        <div style={{ marginBottom: 10 }}>
          <label>Tipo de cliente</label>
          <select
            name="clientClass"
            value={formData.clientClass}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          >
            <option value="">Seleccionar...</option>
            {clientClasses.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px' }}>
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default Register
