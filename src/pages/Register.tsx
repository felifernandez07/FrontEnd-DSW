import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { LoadScript, Autocomplete } from '@react-google-maps/api'

const GOOGLE_API_KEY = 'TU_API_KEY_AQUI' // reemplazá con tu clave de Google Maps

interface ClientClass {
  id: string
  name: string
}

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    birthdate: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    dni: '',
    clientClass: '',
  })

  const [clientClasses, setClientClasses] = useState<ClientClass[]>([])
  const [validationError, setValidationError] = useState('')
  const [serverError, setServerError] = useState('')
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/client/classes')
      .then(res => res.json())
      .then(data => setClientClasses(data.data))
      .catch(err => console.error('Error al cargar clases de cliente:', err))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value })
  }

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      setFormData({ ...formData, address: place.formatted_address || '' })
    }
  }

  const validateFields = () => {
    if (!formData.email.includes('@')) return 'El email no es válido'
    if (formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
    if (!/^[0-9]{6,8}$/.test(formData.dni)) return 'El DNI debe tener entre 6 y 8 dígitos numéricos'
    if (formData.phone.replace(/\D/g, '').length < 10) return 'Número de teléfono no válido'
    if (!formData.birthdate) return 'La fecha de nacimiento es obligatoria'
    if (!formData.clientClass) return 'Debes seleccionar una clase de cliente'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateFields()
    if (error) return setValidationError(error)

    setValidationError('')
    setServerError('')

    try {
      const res = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) return setServerError(data.message || 'Error al registrar')

      alert('¡Registrado con éxito! Ahora podés iniciar sesión.')
      navigate('/login')
    } catch (error) {
      console.error(error)
      setServerError('Error al conectar con el servidor')
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', padding: 30, background: '#fff', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Registro de Usuario</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} required />
        <input name="lastname" placeholder="Apellido" value={formData.lastname} onChange={handleInputChange} required />
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} required />

        {/* Teléfono con código de país */}
        <PhoneInput
          country={'ar'}
          value={formData.phone}
          onChange={handlePhoneChange}
          inputStyle={{ width: '100%' }}
        />

        {/* Dirección con Google Autocomplete */}
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
          <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
            <input name="address" placeholder="Dirección" value={formData.address} onChange={handleInputChange} required />
          </Autocomplete>
        </LoadScript>

        <input name="city" placeholder="Ciudad" value={formData.city} onChange={handleInputChange} required />
        <input name="country" placeholder="País" value={formData.country} onChange={handleInputChange} required />
        <input name="postalCode" placeholder="Código Postal" value={formData.postalCode} onChange={handleInputChange} required />
        <input name="dni" placeholder="DNI (6 a 8 dígitos)" value={formData.dni} onChange={handleInputChange} required />

        {/* Select dinámico de clase de cliente */}
        <select name="clientClass" value={formData.clientClass} onChange={handleInputChange} required>
          <option value="">Seleccioná una clase de cliente</option>
          {clientClasses.map((cls) => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#b87441', color: 'white', border: 'none', borderRadius: 4, fontWeight: 'bold', cursor: 'pointer' }}>
          Registrarse
        </button>

        {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
        {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
      </form>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <span>¿Ya tenés cuenta?</span>{' '}
        <a href="/login">Iniciá sesión</a>
      </div>
    </div>
  )
}

export default Register