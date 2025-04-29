import { Modal, Button } from "react-bootstrap"
import { Product } from "../types/Product.ts"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { toast } from "react-toastify"


type Props = {
  show: boolean
  onClose: () => void
  product: Product | null
}

export const ProductDetailModal = ({ show, onClose, product }: Props) => {
  const { increaseCartQuantity, getItemQuantity } = useShoppingCart()

  if (!product) return null

  const handleAddToCart = () => {
    const currentQuantity = getItemQuantity(product.id)
  
    if (currentQuantity >= Number(product.stock)) {
      toast.error("No hay suficiente stock disponible")
      return
    }
  
    increaseCartQuantity(product.id)
    onClose()
  }
  

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.imgUrl || "https://via.placeholder.com/400"}
          alt={product.nombre}
          className="img-fluid mb-3"
        />
        <p><strong>Precio:</strong> ${product.precio}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Marca:</strong> {product.productBrand?.nombre}</p>
        <p><strong>Clase:</strong> {product.productClass?.name}</p>
        {product.category && (
          <p><strong>Categoría:</strong> {product.category.nombre}</p>
        )}
        <p><strong>Descripción:</strong> {product.descripcion}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={Number(product.stock) === 0}
            >
                    {Number(product.stock) === 0 ? "Sin stock" : "Agregar al carrito"}
        </Button>

      </Modal.Footer>
    </Modal>
  )
}
