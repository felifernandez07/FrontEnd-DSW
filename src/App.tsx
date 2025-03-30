import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home }  from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from "./components/Navbar"
import Personal from "./pages/Personal"
import { ManageBrandsAndClasses } from "./pages/manage"
import Unauthorized  from "./pages/UnAuthorized"
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx"

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
      <Container className="mb-4"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/store" element={<Store />} />
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
