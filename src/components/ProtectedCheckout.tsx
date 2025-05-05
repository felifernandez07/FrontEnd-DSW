import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function ProtectedCheckout({ children }: { children: JSX.Element }) {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const { cartItems } = useShoppingCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con la compra.")
      navigate("/login", { replace: true })
    } else if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de continuar.")
      navigate("/store", { replace: true })
    }
  }, [user, cartItems, navigate])

  if (!user || cartItems.length === 0) return null

  return children
}



