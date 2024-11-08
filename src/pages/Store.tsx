import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem.tsx"
import { useEffect, useState } from "react"
import axios from "axios"


type Product = {
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
    imgUrl: string;
};



export function Store() {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3000/api/products');
        const data = response.data.data;
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    
    
    
    return (
      <>
        <h1>Store</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
        {products.map(product => (
                    <Col key={product.id}>
                        <StoreItem {...product} />
            </Col>
          ))}
        </Row>
      </>
    )
  }