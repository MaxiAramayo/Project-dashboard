import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);

  const handleClickLogut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      {user ? (
        <>
          <div className="bg-slate-700 h-16 text-white flex items-center justify-between p-5">
            <NavLink to="/">Home</NavLink>
            <button className=" bg-slate-800 p-2 rounded-full" onClick={handleClickLogut}>LogOut</button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
