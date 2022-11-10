import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import AboutUs from './Components/AboutUs/AboutUs'
import Catalogue from './Components/Catalogue/Catalogue'
import Contact from './Components/Contact/Contact'
import NavBar from './Components/Navbar/NavBar'
import Detail from './Components/Detail/Detail'
import Footer from './Components/Footer/Footer'
import { AllProducts } from './Components/AdminDashboard/Productos/AllProducts'
import Login from './Components/Login/Login'
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AdminDashboard/" element={<AllProducts />} />
        <Route path="Detail/:id" element={<Detail />} />
        <Route path="Login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
