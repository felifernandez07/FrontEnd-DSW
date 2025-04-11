import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext.tsx"
import { formatCurrency } from "../utilities/formatCurrency.ts"
import { CartItem } from "./CartItem.tsx"
import { useNavigate } from "react-router-dom"


type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, products } = useShoppingCart()
  const navigate = useNavigate()

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map(cartItem => {
              const item = products.find(product => product.id === cartItem.id)
              return item ? (
                <CartItem key={cartItem.id} {...item} quantity={cartItem.quantity} />
              ) : null
            })}
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = products.find(product => product.id === cartItem.id)
                  return total + (item?.precio || 0) * cartItem.quantity
                }, 0)
              )}
            </div>

            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-success" onClick={() => navigate("/checkout")}>
                Pagar ahora
              </button>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>

    
    </>
  )
}
