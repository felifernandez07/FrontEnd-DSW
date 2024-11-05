import { useState, useEffect } from "react";
import axios from "axios";

interface AddProductFormProps {
    onProductAdded: () => void;
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
}

type Product = {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    productBrand: string;
    productClass: string;
};

export function AddProductForm({ onProductAdded, selectedProduct, setSelectedProduct }: AddProductFormProps) {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        productBrand: "",
        productClass: ""
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                nombre: selectedProduct.nombre,
                descripcion: selectedProduct.descripcion,
                precio: selectedProduct.precio.toString(),
                stock: selectedProduct.stock.toString(),
                productBrand: selectedProduct.productBrand,
                productClass: selectedProduct.productClass
            });
        }
    }, [selectedProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedProduct) {
                await axios.put(`http://localhost:3000/api/products/${selectedProduct.id}`, formData);
                setSelectedProduct(null);  // Limpia el formulario tras editar
            } else {
                await axios.post("http://localhost:3000/api/products", formData);
            }
            onProductAdded();
            setFormData({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                productBrand: "",
                productClass: ""
            });
        } catch (error) {
            console.error("Error al agregar o actualizar producto", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
            <input name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
            <input name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
            <input name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
            <input name="productBrand" placeholder="ID de Marca" value={formData.productBrand} onChange={handleChange} required />
            <input name="productClass" placeholder="ID de Clase" value={formData.productClass} onChange={handleChange} required />
            <button type="submit">{selectedProduct ? "Actualizar Producto" : "Agregar Producto"}</button>
        </form>
    );
}