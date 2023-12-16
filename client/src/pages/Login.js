import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout";
import { useDispatch } from "react-redux";
import { authActions } from "./../redux/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/user/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("userId", res?.data?.user._id);
        localStorage.setItem("email", res?.data?.user.email);
        dispatch(authActions.login());
        toast.success(res.data.message);
        navigate("/my-docs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h4 className="text-2xl font-bold mb-4">Login</h4>

          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="exampleInputEmail"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="exampleInputPassword"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
