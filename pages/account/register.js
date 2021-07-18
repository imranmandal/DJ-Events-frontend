import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/component/Layout";
import styles from "@/styles/AuthForm.module.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("Password does not match");
    }
    register({ username, email, password });
  };

  return (
    <>
      <Layout title="User Registration">
        <ToastContainer />
        <div className={styles.auth}>
          <h1>
            <FaUser /> Register
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cPassword">Confirm Password</label>
              <input
                type="password"
                name="cPassword"
                id="cPassword"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>

            <input type="submit" className="btn" value="Register" />
          </form>

          <p>
            Already have an account? <Link href="/account/login">Login</Link>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default RegisterPage;
