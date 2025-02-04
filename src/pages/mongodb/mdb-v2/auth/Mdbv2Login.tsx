import { Link } from "react-router";
import Mdbv2Layout from "../Mdbv2Layout";

export default function Mdbv2Login() {
  return (
    <Mdbv2Layout>
      <h2 className="title">Login</h2>
      <div className="max-w-sm">
        <form className="mb-6">
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" className="input" placeholder="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" className="input" placeholder="******" />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/mdb-v2/register" className="link">
            Register
          </Link>
        </p>
      </div>
    </Mdbv2Layout>
  );
}
