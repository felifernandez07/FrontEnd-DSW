import { render, screen } from "@testing-library/react"
import { StoreItem } from "../components/StoreItem"
import { ShoppingCartProvider } from "../context/ShoppingCartContext"
import { BrowserRouter } from "react-router-dom"
import { formatCurrency } from "../utilities/formatCurrency"

describe("StoreItem", () => {
  it("debería renderizar el nombre y precio correctamente", () => {
    render(
      <BrowserRouter>
        <ShoppingCartProvider>
          <StoreItem
            id="1"
            nombre="Café Especial"
            descripcion="Un café delicioso"
            precio="1200"
            stock="10"
            productBrand={{ id: "1", nombre: "Marca", descripcion: "desc" }}
            productClass={{ id: "1", name: "Clase", description: "desc" }}
          />
        </ShoppingCartProvider>
      </BrowserRouter>
    )

    expect(screen.getByText("Café Especial")).toBeInTheDocument()
    expect(screen.getByText(formatCurrency(1200))).toBeInTheDocument()
  })
})
