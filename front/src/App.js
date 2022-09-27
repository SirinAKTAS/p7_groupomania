import {Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Profil from "./components/Profil/Profil";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
}

export default App;