import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Catalogue from "./Catalogue/Catalogue";
import Contact from "./Contact/Contact";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
