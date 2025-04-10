import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { StoreItem } from "./StoreItem"

describe("StoreItem", () => {
  it("muestra nombre y precio", () => {
    render(
      <StoreItem
        id="1"
        nombre="Café Especial"
        descripcion="Intenso y aromático"
        precio="1299.99"
        stock="5"
        productBrand={{ id: "1", nombre: "Marca", descripcion: "desc" }}
        productClass={{ id: "1", name: "Clase", description: "desc" }}
      />
    )

    expect(screen.getByText("Café Especial")).toBeInTheDocument()
    expect(screen.getByText(/\$1,299.99/)).toBeInTheDocument()
  })
})
