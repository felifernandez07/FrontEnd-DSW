import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { formatCurrency } from "../utilities/formatCurrency.ts";

type CartItemProps = {
    id: string;
    nombre: string;
    precio: number;
    imagen: string;
    quantity: number;
    imgUrl?: string;
};

export function CartItem({ id, nombre, precio, imgUrl, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart();
    const formattedName = nombre.replace(/\s+/g, '_').toLowerCase();
    const imagePath = imgUrl || `/imgs/${formattedName}.jpg`;
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={imagePath}
                alt={nombre}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
            />
            <div className="me-auto">
                <div>
                    {nombre}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(precio)}
                </div>
            </div>
            <div> {formatCurrency(precio * quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(id)}
            >
                &times;
            </Button>
        </Stack>
    );
}

