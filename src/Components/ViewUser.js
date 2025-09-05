import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

const ViewUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={style.main}>
      <div className={style.block}>
        <h1 className={style.color}>View User</h1><br />
        <h5 className={style.color}> NAME : {user.name} </h5><br />
        <h5 className={style.color}> PHONE : {user.phone} </h5><br />
        <h5 className={style.color}> EMAIL : {user.email} </h5><br />
        <Link to="/home">Cancel</Link>
      </div>
    </div>
  );
};

export default ViewUser;
