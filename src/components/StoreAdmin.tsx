import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { toast } from "react-toastify";

interface StoreAdminProps {
  id: string;
  nombre: string;
  precio: number;
  imgUrl?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function StoreAdmin({ id, nombre, precio, imgUrl, onEdit, onDelete }: StoreAdminProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  const handleAdd = () => {
    increaseCartQuantity(id);
  };

  const handleRemove = () => {
    removeFromCart(id);
    toast.info(`${nombre} eliminado del carrito`);
  };

  const imagePath = imgUrl || "/imgs/default.jpg";

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imagePath}
        height="200px"
        style={{ objectFit: "cover" }}
        onError={(e) => (e.currentTarget.src = "/imgs/default.jpg")}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{nombre}</span>
          <span className="ms-2 text-muted">${precio}</span>
        </Card.Title>

        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={handleAdd}>
              + Agregar al Carrito
            </Button>
          ) : (
            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
              <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> en el carrito
                </div>
                <Button onClick={handleAdd}>+</Button>
              </div>
              <Button variant="danger" size="sm" onClick={handleRemove}>
                Remover
              </Button>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between mt-3">
          <Button variant="warning" onClick={onEdit}>
            Editar
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

