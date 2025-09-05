import React, { useRef } from "react";
import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  let navigate = useNavigate();

  let name = useRef(null);
  let phone = useRef(null);
  let email = useRef(null);
  let password = useRef(null);

  let handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      name: name.current.value,
      phone: phone.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    if (data.name && data.phone && data.email && data.password) {
      axios
        .post("http://notesapp-backend-latest.onrender.com/users", data)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch(() => {
          alert("User Already Exists");
        });
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className={style.main}>
      <div className={style.block}>
        <form onSubmit={handleSubmit} method="POST" action="">
          <h1 className={style.color}>Sign Up</h1><br />
          <input type="text" placeholder="Enter Name" ref={name} /><br /><br />
          <input type="tel" placeholder="Enter Phone Number" ref={phone} /><br /><br />
          <input type="email" placeholder="Enter Email Address" ref={email} /><br /><br />
          <input type="password" placeholder="Enter Password" ref={password} /><br /><br />
          <button className="btn btn-primary">Submit</button><br />
          <p className={style.color}>
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
