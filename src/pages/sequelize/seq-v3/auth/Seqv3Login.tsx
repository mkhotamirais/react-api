import { useState } from "react";
import axios from "axios";
import { url } from "../useSeqv3";
import { toast } from "sonner";
export default function Seqv3Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    axios
      .create({ withCredentials: true })
      .post(`${url}/api-sequelize/v3/signin`, formData)
      .then((res) => {
        toast.success(res.data.message);
        setFormData({ email: "", password: "" });
        window.location.href = "/sequelize-v3";
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <div className="max-w-md">
      <h2 className="title">Login</h2>
      <form onSubmit={onLogin}>
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
        <button type="submit" disabled={pending} className="btn">
          Login
        </button>
      </form>
    </div>
  );
}
