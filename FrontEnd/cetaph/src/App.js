import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Catalogue from "./Catalogue/Catalogue";
import Contact from "./Contact/Contact";
import NavBar from "./Navbar/NavBar";
import Detail from "./Detail/Detail";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="Details/:id" element={[<Detail />, <NavBar />]} />
      </Routes>
    </div>
  );
}

export default App;
