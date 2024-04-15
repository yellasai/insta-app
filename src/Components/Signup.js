import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const { setToken } = useContext(UserContext);

  function updateUser(e) {
    let key = e.target.name;
    setUser({ ...user, [key]: e.target.value });
  }

  //Validations

  async function implementSignup(e) {
    console.log("hello");
    e.preventDefault();
    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      setMessage("Please fill all the details");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setMessage("Password and confirm Password do not match");
      return;
    }

    //signup Api-https://instagram-express-app.vercel.app/api/auth/signup
    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/auth/signup",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );
      console.log("success", response.data.message);
      console.log("status", response.status);
      setMessage(response.data.message);
      console.log("token", response.data.data.token);
      setToken(response.data.data.token);

      setUser({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.log("Error", error.response.data.message);
      console.log("status", error.response.status);
      setMessage(error.response.data.message);
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      {message && <h2>{message}</h2>}
      <form onSubmit={implementSignup}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={updateUser}
          value={user.name}
        />
        <br></br>

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={updateUser}
          value={user.email}
        />
        <br></br>

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={updateUser}
          value={user.password}
        />
        <br></br>

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={updateUser}
          value={user.confirmPassword}
        />
        <br></br>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Signup;
