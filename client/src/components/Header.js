import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      alert("Logout successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-body-tertiary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="text-gray-700 text-xl font-bold" to="/">
          DocFlow
        </Link>

        <div className="hidden lg:flex items-center">
          {isLogin && (
            <>
              <ul className="flex space-x-4">
                <li>
                  <NavLink to="/my-docs" className="text-gray-700">
                    My Docs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/create-doc" className="text-gray-700">
                    Create Doc
                  </NavLink>
                </li>
              </ul>
            </>
          )}

          <ul className="flex space-x-4">
            {!isLogin ? (
              <>
                <li>
                  <NavLink to="/login" className="text-gray-700">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="text-gray-700">
                    SignUp
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary mx-2">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
