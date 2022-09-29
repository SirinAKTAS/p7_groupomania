import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import { uidContext } from "./components/AppContext"; 
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUid(res.data)
      })
      .catch((err) => console.log('No token'));
    };
    fetchToken();
  }, [uid]);

  return (
    <uidContext.Provider value={uid}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </uidContext.Provider>
  );
}

export default App;