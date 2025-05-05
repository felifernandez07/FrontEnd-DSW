import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from "./components/Navbar"
import Personal from "./pages/Personal"
import { ManageBrandsAndClasses } from "./pages/Manage"
import Unauthorized from "./pages/UnAuthorized"
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx"
import { StoreAdm } from "./pages/AdminStore"
import { Checkout } from "./pages/Checkout.tsx"
import { ProtectedCheckout } from "./components/ProtectedCheckout.tsx"
import { Success } from "./pages/Success.tsx"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function AdminOnlyRoute({ children }: { children: JSX.Element }) {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  if (!user || user.role !== "admin") {
    return <Unauthorized />
  }
  return children
}

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/store" element={<Store />} />
          <Route
            path="/checkout"
            element={
              <ProtectedCheckout>
                <Checkout />
              </ProtectedCheckout>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route
            path="/adm-store"
            element={
              <AdminOnlyRoute>
                <StoreAdm />
              </AdminOnlyRoute>
            }
          />
          <Route
            path="/manage"
            element={
              <AdminOnlyRoute>
                <ManageBrandsAndClasses />
              </AdminOnlyRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />

         

        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
