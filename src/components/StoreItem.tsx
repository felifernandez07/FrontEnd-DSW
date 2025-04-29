import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ProductDetailModal } from "./ProductDetailModal";
import { toast } from "react-toastify";

type StoreItemProps = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: string;
  productBrand: {
    id: string;
    nombre: string;
    descripcion: string;
  };
  productClass: {
    id: string;
    name: string;
    description: string;
  };
  imgUrl?: string;
};

export function StoreItem({
  id,
  nombre,
  descripcion,
  precio,
  stock,
  productBrand,
  productClass,
  imgUrl,
}: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  const [showModal, setShowModal] = useState(false);

  const imagePath = imgUrl || `/imgs/${id}.jpg`;

  const product = {
    id,
    nombre,
    descripcion,
    precio,
    stock,
    imgUrl: imagePath,
    productBrand,
    productClass,
  };


  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={imagePath}
          height="200px"
          style={{ objectFit: "cover", cursor: "pointer" }}
          onClick={() => setShowModal(true)}
          onError={(e) => (e.currentTarget.src = "/imgs/default.jpg")}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{nombre}</span>
            <span className="ms-2 text-muted">
              {formatCurrency(Number(precio))}
            </span>
          </Card.Title>

          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="w-100"
                onClick={() => {
                  if (quantity >= Number(stock)) {
                    toast.error("No hay suficiente stock")
                    return
                  }
                  increaseCartQuantity(id)
                }}
                disabled={Number(stock) === 0}
              >
                {Number(stock) === 0 ? "Sin stock" : "+ Añadir al carrito"}
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span> en carrito
                  </div>
                  <Button 
                        onClick={() => {
                          if (quantity >= Number(stock)) {
                              toast.error("No hay más unidades disponibles")
                           return
                           }
                                increaseCartQuantity(id)
                          }}
                    >
                  +
                  </Button>
                </div>
                <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <ProductDetailModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </>
  );
}


