import { Link } from "react-router";
import Mdbv2Layout from "../Mdbv2Layout";

export default function Mdbv2Register() {
  return (
    <Mdbv2Layout>
      <h2 className="title">Register</h2>
      <div className="max-w-sm">
        <form className="mb-6">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="input" placeholder="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" className="input" placeholder="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="input" placeholder="******" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="cofirmPassword" className="input" placeholder="******" />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
        <p>
          Do not have an account?{" "}
          <Link to="/mdb-v2/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </Mdbv2Layout>
  );
}
