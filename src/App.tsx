import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home }  from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import Login from './pages/Login'
import Register from './pages/Register'
import  Navbar  from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx"

function App() {
  return (
    <ShoppingCartProvider>
  <Navbar />
  <Container className="mb-4"> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

  </Container>
  
  </ShoppingCartProvider>
  );
}


export default App
