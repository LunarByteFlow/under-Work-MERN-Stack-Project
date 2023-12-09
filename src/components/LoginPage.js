import React, { useState,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../userContext";
import Alert from "./Alert";


const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const {setUser} = useContext(UserContext);
  let navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    console.log(json);
    setUser(json.user)
    if (json.success) {
      //Redirect the user to His/her notes page.
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      < Alert message={"logged In Successfully"}/>
    } else {
      < Alert message={"Invalid credentials!"}/>  
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="m4-4 mb-18">
        <h1 className="text-4xl text-center mb-8">Login</h1>
        <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="123@email.com"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button className="primary">Login</button>
          <div className="text-center font-bold">
            Don't have an account yet?
            <Link to={"/register"} className="hover:text-slate-500">
              {" "}
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
