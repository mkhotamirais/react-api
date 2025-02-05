import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import Mys from "./pages/mysql/Mys";
import Psg from "./pages/postgresql/Psg";
import Mdbv1 from "./pages/mongodb/mdb-v1/Mdbv1";
import Mdbv2 from "./pages/mongodb/mdb-v2/Mdbv2";
import Mdbv2Login from "./pages/mongodb/mdb-v2/auth/Mdbv2Login";
import Mdbv2Register from "./pages/mongodb/mdb-v2/auth/Mdbv2Register";
import Mys2v1 from "./pages/mysql2/Mys2v1";
import Seqv1 from "./pages/sequelize/seq-v1/Seqv1";
import Seqv2 from "./pages/sequelize/seq-v2/Seqv2";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mongoose-v1" element={<Mdbv1 />} />
          <Route path="/mongoose-v2">
            <Route index element={<Mdbv2 />} />
            <Route path="login" element={<Mdbv2Login />} />
            <Route path="register" element={<Mdbv2Register />} />
          </Route>
          <Route path="/mysql2-v1" element={<Mys2v1 />} />
          <Route path="/sequelize-v1" element={<Seqv1 />} />
          <Route path="/sequelize-v2" element={<Seqv2 />} />
          <Route path="/mysql" element={<Mys />} />
          <Route path="/postgresql" element={<Psg />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
