import { Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export function Success() {
  const navigate = useNavigate()
  const location = useLocation()

  const orderId = location.state?.orderId ?? "N/A"
  const paymentMethod = location.state?.paymentMethod ?? "No especificado"

  const [estimatedDate, setEstimatedDate] = useState("")

  useEffect(() => {


    // Calcular fecha estimada dentro de 5 días hábiles
    const today = new Date()
    let daysToAdd = 0
    while (daysToAdd < 5) {
      today.setDate(today.getDate() + 1)
      const day = today.getDay()
      if (day !== 0 && day !== 6) daysToAdd++ // Ignorar sábado y domingo
    }
    setEstimatedDate(today.toLocaleDateString())
  }, [])

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">Gracias por tu compra!!</h1>
      <p className="lead">
        Hemos recibido tu orden correctamente. Pronto recibirás un correo con los detalles del envío.
      </p>
      <p className="fw-bold">Número de orden: #{orderId}</p>

      <p>Método de pago seleccionado: <strong>{paymentMethod}</strong></p>

      <p className="text-muted">Entrega estimada: {estimatedDate}</p>
      <Button className="mt-4" variant="primary" onClick={() => navigate("/")}>Volver al inicio</Button>
    </Container>
  )
}