import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
