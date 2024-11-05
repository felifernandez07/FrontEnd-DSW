import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddProductForm } from "../components/AddProductForm";

type Product = {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    productBrand: string;
    productClass: string;
    imgUrl?: string;
};

export function Store() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:3000/api/products");
        const data = response.data.data;
        setProducts(data);
    };

    const deleteProduct = async (id: string) => {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        fetchProducts();
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <h1>Store</h1>
            <AddProductForm onProductAdded={fetchProducts} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
            <Row md={2} xs={1} lg={3} className="g-3">
                {products.map(product => (
                    <Col key={product.id}>
                        <StoreItem {...product} onEdit={() => handleEdit(product)} onDelete={() => deleteProduct(product.id)} />
                    </Col>
                ))}
            </Row>
        </>
    );
}
