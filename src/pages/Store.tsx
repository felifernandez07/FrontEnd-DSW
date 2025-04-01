import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem.tsx"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

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
  const [products, setProducts] = useState<Product[]>([])

  // Leer parámetro de búsqueda desde la URL
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const [searchTerm, setSearchTerm] = useState(initialSearch)

  const fetchProducts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
    const data = response.data.data
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  console.log("Buscando:", searchTerm)
  
  // Filtrar productos por nombre
  const filteredProducts = products.filter(product => {
    const nombre = product.nombre?.toLowerCase() || ''
    const marca = product.productBrand?.nombre?.toLowerCase() || ''
    const clase = product.productClass?.name?.toLowerCase() || ''
    const search = searchTerm.toLowerCase()
  
    return (
      nombre.includes(search) ||
      marca.includes(search) ||
      clase.includes(search)
    )
  })
  
  

  
    return (
      <>
        <h1>Store</h1>
    
        {/* Botón para limpiar búsqueda */}
        {searchTerm && (
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => {
              setSearchTerm('');
              window.history.replaceState({}, '', '/store'); // limpia la URL
            }}
          >
            Limpiar búsqueda
          </button>
        )}
    
        <Row md={2} xs={1} lg={3} className="g-3">
          {filteredProducts.map(product => (
            <Col key={product.id}>
              <StoreItem {...product} />
            </Col>
          ))}
        </Row>
    
        {/* Pop-up si no hay resultados */}
        {filteredProducts.length === 0 && (
          <div className="alert alert-warning mt-4" role="alert">
            No se encontraron productos que coincidan con tu búsqueda.
          </div>
        )}
      </>
    )
  
}