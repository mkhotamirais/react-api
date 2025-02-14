import { useState } from "react";
import axios from "axios";
import { url } from "../useMoov3";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Moov3Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confPassword: "" });
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();

  const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    axios
      .post(`${url}/api-mongoose/v3/signup`, formData)
      .then((res) => {
        toast.success(res.data.message);
        setFormData({ name: "", email: "", password: "", confPassword: "" });
        navigate("/mongoose-v3/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <div className="max-w-md">
      <h2 className="title">Register</h2>
      <form onSubmit={onRegister}>
        {/* name */}
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="input"
            id="name"
            placeholder="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={pending}
          />
        </div>
        {/* email */}
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="input"
            id="email"
            placeholder="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={pending}
          />
        </div>
        {/* password */}
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            id="password"
            placeholder="******"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={pending}
          />
        </div>
        {/* confPassword */}
        <div className="mb-6">
          <label htmlFor="confPassword">Confirm Password</label>
          <input
            type="password"
            className="input"
            id="confPassword"
            placeholder="******"
            value={formData.confPassword}
            onChange={(e) => setFormData({ ...formData, confPassword: e.target.value })}
            disabled={pending}
          />
        </div>
        <button type="submit" disabled={pending} className="btn">
          Register
        </button>
      </form>
    </div>
  );
}
