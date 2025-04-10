import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "../components/ShoppingCart.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { useLocation } from "react-router-dom"
import { API_URL } from "../config/api";
// const API_URL = "http://localhost:3000";
type Product = {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;  // Agrega esta propiedad si es necesaria
};

type ShoppingCartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: string;
    quantity: number;
};

type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: string) => number;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartQuantity: number;
    cartItems: CartItem[];
    products: Product[];  // Añade productos aquí
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    const [products, setProducts] = useState<Product[]>([]);  // Añade estado para los productos
    const location = useLocation()

    

        useEffect(() => {
            setIsOpen(false)
            }, [location.pathname])


    const fetchProducts = async () => {
        try {
            const response = await axios.get (`${API_URL}/products`);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartQuantity(id: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeFromCart(id: string) {
        setCartItems(currItems => currItems.filter(item => item.id !== id));
    }

    function clearCart() {
        setCartItems([])
      }


    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                clearCart,
                cartItems,
                cartQuantity,
                products,  // Provee productos en el contexto
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}

