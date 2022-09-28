import {Routes, Route} from "react-router-dom";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Profil from "./pages/Profil";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;