import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Catalogue from "./Components/Catalogue/Catalogue";
import Contact from "./Components/Contact/Contact";
import NavBar from "./Components/Navbar/NavBar";
import Detail from "./Components/Detail/Detail";
import Footer from "./Components/Footer/Footer";
import { CreateAlbumForm } from "./Components/AdminDashboard/CreateAlbumForm";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AdminDashboard/CreateAlbum" element={<CreateAlbumForm />} />
        <Route path="Detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
