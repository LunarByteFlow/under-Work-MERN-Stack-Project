import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterUser = () => {
  const [SignUpCredentials, setSignUpCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch(`http://localhost:8000/api/auth/createUser`, {
      const response = await fetch(`http://localhost:8000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: SignUpCredentials.email,
        password: SignUpCredentials.password,
        name: SignUpCredentials.name,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Redirect the user to His/her notes page.
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      console.log("Some error occured. Please try again")
    }
  };
  const handleChange = (e) => {
    setSignUpCredentials({
      ...SignUpCredentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="m4-4 mb-18">
        <h1 className="text-4xl text-center mb-8">Register yourself</h1>
        <form onSubmit={handleSignUpSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
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
            Already have an account?
            <Link to={"/login"} className="hover:text-slate-500">
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterUser;
