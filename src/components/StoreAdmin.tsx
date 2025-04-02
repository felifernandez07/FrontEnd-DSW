import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface StoreAdminProps {
    id: string;
    nombre: string;
    precio: number;
    imgUrl?: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function StoreAdmin({ id, nombre, precio, imgUrl, onEdit, onDelete }: StoreAdminProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    const quantity = getItemQuantity(id);

    // Crear la ruta de la imagen usando el `nombre` del producto
    const formattedName = nombre.replace(/\s+/g, '_').toLowerCase();
    const imagePath = imgUrl || `/imgs/${formattedName}.jpg`;

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imagePath}
                height="200px"
                style={{ objectFit: "cover" }}
                onError={(e) => (e.currentTarget.src = "/imgs/default.jpg")} // Imagen predeterminada si no se encuentra la imagen
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{nombre}</span>
                    <span className="ms-2 text-muted">${precio}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
                            + Agregar al Carrito
                        </Button>
                    ) : (
                        <>
                            <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                                    <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                    <div>
                                        <span className="fs-3">{quantity}</span> en el carrito
                                    </div>
                                    <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                                </div>
                                <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>
                                    Remover
                                </Button>
                            </div>
                        </>
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
