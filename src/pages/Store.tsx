import { Col, Row, Button } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem.tsx"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import Slider from "rc-slider"
import 'rc-slider/assets/index.css'


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
  category?: {
    id: string;
    nombre: string;
  };
  imgUrl: string;
};

export function Store() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{ id: string; nombre: string }[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc' | ''>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 8

  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const [searchTerm, setSearchTerm] = useState(initialSearch)

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?page=${page}&limit=${limit}`)
      const data = response.data
      setProducts(prev => page === 1 ? data.data : [...prev, ...data.data])
      setHasMore(page < data.totalPages)
    } catch (error) {
      console.error("Error al obtener productos", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`)
      setCategories(response.data.data)
    } catch (error) {
      console.error("Error al obtener categorías", error)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [page])

  let filteredProducts = products.filter(product => {
    const nombre = product.nombre?.toLowerCase() || ''
    const marca = product.productBrand?.nombre?.toLowerCase() || ''
    const clase = product.productClass?.name?.toLowerCase() || ''
    const categoriaId = product.category?.id || ''
    const precio = parseFloat(product.precio)
    const search = searchTerm.toLowerCase()

    const coincideBusqueda =
      nombre.includes(search) ||
      marca.includes(search) ||
      clase.includes(search)

    const coincideCategoria =
      !selectedCategory || categoriaId === selectedCategory

    const dentroDeRango =
      precio >= priceRange[0] && precio <= priceRange[1]

    return coincideBusqueda && coincideCategoria && dentroDeRango
  })

  if (priceOrder === 'asc') {
    filteredProducts = filteredProducts.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio))
  } else if (priceOrder === 'desc') {
    filteredProducts = filteredProducts.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio))
  }

  return (
    <>
      <h1>Tienda</h1>

      {searchTerm && (
        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => {
            setSearchTerm('');
            window.history.replaceState({}, '', '/store');
          }}
        >
          Limpiar búsqueda
        </button>
      )}

      <div className="mb-3 d-flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() =>
              setSelectedCategory(prev => prev === category.id ? null : category.id)
            }
          >
            {category.nombre}
          </button>
        ))}
      </div>

      <div className="d-flex flex-wrap gap-4 mb-4 align-items-center">
        <div style={{ minWidth: 300 }}>
          <label className="form-label">Filtrar por precio</label>
          <Slider
            range
            min={0}
            max={30000}
            step={100}
            defaultValue={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            marks={{ 0: '$0', 30000: '$30k' }}
          />
          <div className="mt-4">
            <small>Desde: ${priceRange[0]} — Hasta: ${priceRange[1]}</small>
          </div>
        </div>

        <div>
          <label htmlFor="order" className="form-label">Ordenar por precio</label>
          <select
            id="order"
            className="form-select"
            value={priceOrder}
            onChange={(e) => setPriceOrder(e.target.value as 'asc' | 'desc' | '')}
          >
            <option value="">Sin orden</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>
      </div>

      <Row md={2} xs={1} lg={3} className="g-3">
        {filteredProducts.map(product => (
          <Col key={product.id}>
            <StoreItem {...product} />
          </Col>
        ))}
      </Row>

      {filteredProducts.length === 0 && (
        <div className="alert alert-warning mt-4" role="alert">
          No se encontraron productos que coincidan con los filtros seleccionados.
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-4">
          <Button onClick={() => setPage(prev => prev + 1)}>Ver más</Button>
        </div>
      )}
    </>
  )
}


