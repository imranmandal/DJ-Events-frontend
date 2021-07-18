import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/component/Layout";
import styles from "@/styles/AuthForm.module.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <>
      <Layout title="User Login">
        <ToastContainer />
        <div className={styles.auth}>
          <h1>
            <FaUser /> Log In
          </h1>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="password">Password </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input type="submit" className="btn" value="Login" />
          </form>

          <p>
            Don't have an account?{" "}
            <Link href="/account/register">Register</Link>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;
