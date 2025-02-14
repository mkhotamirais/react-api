import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import Mys from "./pages/mysql/Mys";
import Psg from "./pages/postgresql/Psg";
import Mys2v1 from "./pages/mysql2/Mys2v1";
import Seqv1 from "./pages/sequelize/seq-v1/Seqv1";
import Seqv2 from "./pages/sequelize/seq-v2/Seqv2";
import Seqv3 from "./pages/sequelize/seq-v3/Seqv3";
import Seqv3Login from "./pages/sequelize/seq-v3/auth/Seqv3Login";
import Seqv3Register from "./pages/sequelize/seq-v3/auth/Seqv3Register";
import Moov1 from "./pages/mongoose/moo-v1/Moov1";
import Moov2 from "./pages/mongoose/moo-v2/Moov2";
import Seqv3Account from "./pages/sequelize/seq-v3/public/Seqv3Account";
import Seqv3Users from "./pages/sequelize/seq-v3/dashboard/Seqv3Users";
import Seqv3Tags from "./pages/sequelize/seq-v3/dashboard/Seqv3Tags";
import Seqv3Categories from "./pages/sequelize/seq-v3/dashboard/Seqv3Categories";
import Seqv3Dashboard from "./pages/sequelize/seq-v3/dashboard/Seqv3Dashboard";
import Seqv3Layout from "./pages/sequelize/seq-v3/Seqv3Layout";
import Seqv3Protected from "./pages/sequelize/seq-v3/Seqv3Protected";
import Seqv3IsLogin from "./pages/sequelize/seq-v3/Seqv3IsLogin";
import Seqv3Products from "./pages/sequelize/seq-v3/dashboard/Seqv3Products";
import Seqv3ProtectedAdmin from "./pages/sequelize/seq-v3/Seqv3ProtectedAdmin";
import Seqv3ProductsCreate from "./pages/sequelize/seq-v3/dashboard/Seqv3ProductsCreate";
import Seqv3ProductsEdit from "./pages/sequelize/seq-v3/dashboard/Seqv3ProductsEdit";
import Moov3Layout from "./pages/mongoose/moo-v3/Moov3Layout";
import Moov3 from "./pages/mongoose/moo-v3/Moov3";
import Moov3IsLogin from "./pages/mongoose/moo-v3/Moov3IsLogin";
import Moov3Login from "./pages/mongoose/moo-v3/auth/Moov3Login";
import Moov3Register from "./pages/mongoose/moo-v3/auth/Moov3Register";
import Moov3Protected from "./pages/mongoose/moo-v3/Moov3Protected";
import Moov3Account from "./pages/mongoose/moo-v3/public/Moov3Account";
import Moov3ProtectedAdmin from "./pages/mongoose/moo-v3/Moov3ProtectedAdmin";
import Moov3Dashboard from "./pages/mongoose/moo-v3/dashboard/Moov3Dashboard";
import Moov3Categories from "./pages/mongoose/moo-v3/dashboard/Moov3Categories";
import Moov3Tags from "./pages/mongoose/moo-v3/dashboard/Moov3Tags";
import Moov3Users from "./pages/mongoose/moo-v3/dashboard/Moov3Users";
import Moov3Products from "./pages/mongoose/moo-v3/dashboard/Moov3Products";
import Moov3ProductsCreate from "./pages/mongoose/moo-v3/dashboard/Moov3ProductsCreate";
import Moov3ProductsEdit from "./pages/mongoose/moo-v3/dashboard/Moov3ProductsEdit";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mongoose-v1" element={<Moov1 />} />
          <Route path="/mongoose-v2" element={<Moov2 />} />
          <Route path="/mysql2-v1" element={<Mys2v1 />} />
          <Route path="/sequelize-v1" element={<Seqv1 />} />
          <Route path="/sequelize-v2" element={<Seqv2 />} />
          <Route path="/sequelize-v3" element={<Seqv3Layout />}>
            <Route index element={<Seqv3 />} />
            <Route element={<Seqv3IsLogin />}>
              <Route path="login" element={<Seqv3Login />} />
              <Route path="register" element={<Seqv3Register />} />
            </Route>
            <Route element={<Seqv3Protected />}>
              <Route path="account" element={<Seqv3Account />} />
              <Route element={<Seqv3ProtectedAdmin />}>
                <Route path="dashboard" element={<Seqv3Dashboard />} />
                <Route path="users" element={<Seqv3Users />} />
                <Route path="tags" element={<Seqv3Tags />} />
                <Route path="categories" element={<Seqv3Categories />} />
                <Route path="products">
                  <Route index element={<Seqv3Products />} />
                  <Route path="create" element={<Seqv3ProductsCreate />} />
                  <Route path="edit/:id" element={<Seqv3ProductsEdit />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="/mongoose-v3" element={<Moov3Layout />}>
            <Route index element={<Moov3 />} />
            <Route element={<Moov3IsLogin />}>
              <Route path="login" element={<Moov3Login />} />
              <Route path="register" element={<Moov3Register />} />
            </Route>
            <Route element={<Moov3Protected />}>
              <Route path="account" element={<Moov3Account />} />
              <Route element={<Moov3ProtectedAdmin />}>
                <Route path="dashboard" element={<Moov3Dashboard />} />
                <Route path="users" element={<Moov3Users />} />
                <Route path="tags" element={<Moov3Tags />} />
                <Route path="categories" element={<Moov3Categories />} />
                <Route path="products">
                  <Route index element={<Moov3Products />} />
                  <Route path="create" element={<Moov3ProductsCreate />} />
                  <Route path="edit/:id" element={<Moov3ProductsEdit />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="/mysql" element={<Mys />} />
          <Route path="/postgresql" element={<Psg />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
