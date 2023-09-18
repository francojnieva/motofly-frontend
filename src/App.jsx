
import './App.css'
import NavPages from './Components/TabPages'
import { ProductProvider } from './Components/ProductContext.jsx'
import NavBar from './Components/Navbar'
import { CartProvider } from './Components/CartContext'
import Footer from './Components/Footer'
import { UserProvider } from './Components/UserContext'


function App() {


  return (
    <>
    <UserProvider>
    <ProductProvider >
      <CartProvider>
    <NavBar/>
    <NavPages/> 
    </CartProvider>
    </ProductProvider>
    </UserProvider>
    <Footer/>
    
    </>
  )
}

export default App
