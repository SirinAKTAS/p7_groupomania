import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import { uidContext } from "./components/AppContext"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

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

    if (uid) dispatch(getUser(uid))
  }, [uid, dispatch]);

  return (
    <uidContext.Provider value={uid}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </uidContext.Provider>
  );
}

export default App;